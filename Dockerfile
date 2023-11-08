# Use the official lightweight Node.js 16 image.
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache make g++ python3 py3-pip

# Optionally: Install `node-gyp` globally
RUN npm install -g node-gyp

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application
RUN npm run build

# Use nginx alpine for serving content
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Define the command to run your app using CMD which defines your runtime
CMD ["nginx", "-g", "daemon off;"]
