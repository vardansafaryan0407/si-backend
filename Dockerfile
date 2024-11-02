FROM node:20.18.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3000

# The command to run your app
CMD ["npm","run", "start:dev"]
