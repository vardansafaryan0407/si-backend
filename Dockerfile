# Production image for the Startups Incubator API.
# Build:  docker build -t si-api .
# Run:    docker run --env-file .env -p 3000:3000 si-api
# The dev image with hot reload lives in Dockerfile.dev (used by si-docker-compose).

# ---- build stage: compile TypeScript with dev dependencies present ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund
COPY . .
RUN npm run build && npm prune --omit=dev --legacy-peer-deps

# ---- runtime stage: only compiled code and production dependencies ----
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json .sequelizerc ./
# migrations and seeders run inside this image via `npx sequelize db:migrate`
COPY database ./database
# deploy files travel with the image so the server always runs the versioned copy
COPY deploy ./deploy
RUN mkdir -p uploads && chown -R node:node /app
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health >/dev/null || exit 1
CMD ["node", "dist/main"]
