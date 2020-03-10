# Use the official image as a parent image
FROM node:current-slim

# Set the working directory
WORKDIR /usr/client-app

# Copy the file from your host to your current location
COPY package.json .

# Run the command inside your image filesystem
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Run unit tests
RUN npm run test

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

# Run the specified command within the container.
CMD [ "npm", "start" ]



#docker build -t liveupdateclient:latest .
#docker container run --name liveupdateclient -p 3000:3000 liveupdateclient:latest
# docker container run --name [container-name] --env PORT=8500 -p 8500:8500 [image:tag-name]