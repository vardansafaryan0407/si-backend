FROM node:20.12.2 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
COPY yarn.lock* ./

# Install any dependencies
RUN npm install --only=production --legacy-peer-deps

# Bundle your app's source code inside the Docker image
COPY . .

# Build your app
RUN npm run build

# The command to run your app
CMD ["npm","run", "start:dev"]
