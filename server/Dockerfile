FROM node:20

# set working directory of container
# N.B: COPY commands will move files here
WORKDIR /usr/src/server

# copy package.json and package-lock.json to the container
COPY package*.json ./

# install dependencies
RUN npm install

# copy the application code to the container
COPY . .

# expose port to run application on
EXPOSE 9000

# run command
CMD ["npm", "start"]
