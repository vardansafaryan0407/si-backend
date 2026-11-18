#!/usr/bin/env bash
# Deploys one API image tag on this instance.
#
# Called by the GitHub Actions deploy workflow through SSM Run Command:
#   /opt/si/deploy.sh <image-tag>
# Also usable by hand from an SSM session to roll back:
#   sudo /opt/si/deploy.sh <previous-tag>
#
# Expects: docker with the compose plugin, the AWS CLI, and an instance role that can
# read /si/production/* from SSM Parameter Store and pull from the si-api ECR repository.

set -euo pipefail

TAG="${1:?usage: deploy.sh <image-tag>}"
APP_DIR="${APP_DIR:-/opt/si}"
REGION="${AWS_REGION:-us-west-1}"
PARAM_PATH="${PARAM_PATH:-/si/production/}"
REPO="${ECR_REPOSITORY:-si-api}"

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGISTRY="${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com"
IMAGE="${REGISTRY}/${REPO}:${TAG}"
COMPOSE=(docker compose --env-file "${APP_DIR}/.deploy.env" -f "${APP_DIR}/docker-compose.prod.yml")

mkdir -p "$APP_DIR"
cd "$APP_DIR"

echo "==> Pulling ${IMAGE}"
aws ecr get-login-password --region "$REGION" | docker login --username AWS --password-stdin "$REGISTRY" >/dev/null
docker pull "$IMAGE"

echo "==> Refreshing deploy files from the image"
docker run --rm "$IMAGE" tar -C /app -c deploy | tar -x --strip-components=1

echo "==> Rendering .env from SSM Parameter Store (${PARAM_PATH})"
aws ssm get-parameters-by-path --path "$PARAM_PATH" --recursive --with-decryption --region "$REGION" \
  --query "Parameters[].[Name,Value]" --output text \
  | awk -F'\t' '{ name=$1; sub(".*/", "", name); print name "=" $2 }' > .env.new
grep -q '^DB_HOST=' .env.new || { echo "DB_HOST missing from Parameter Store; aborting"; rm -f .env.new; exit 1; }
chmod 600 .env.new
mv .env.new .env
printf 'API_IMAGE=%s\nAPI_DOMAIN=%s\nWEB_DOMAIN=%s\n' "$IMAGE" "$(grep -E '^API_DOMAIN=' .env | cut -d= -f2-)" "$(grep -E '^WEB_DOMAIN=' .env | cut -d= -f2-)" > .deploy.env

echo "==> Running database migrations"
docker run --rm --env-file .env "$IMAGE" npx sequelize db:migrate --env production

echo "==> Applying reference data (countries, industries, roles, skills); already-applied seeders are skipped"
docker run --rm --env-file .env "$IMAGE" npx sequelize db:seed:all --env production

echo "==> Starting ${TAG}"
"${COMPOSE[@]}" up -d --remove-orphans

echo "==> Waiting for the API to report healthy"
for attempt in $(seq 1 30); do
  if "${COMPOSE[@]}" exec -T api wget -qO- http://127.0.0.1:3000/health >/dev/null 2>&1; then
    echo "healthy: ${IMAGE}"
    echo "$TAG" > .current-tag
    docker image prune -af --filter "until=72h" >/dev/null 2>&1 || true
    exit 0
  fi
  sleep 2
done

echo "API did not become healthy; last log lines:"
"${COMPOSE[@]}" logs --tail 100 api || true
exit 1
