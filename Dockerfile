FROM node:14.15.3

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/node_modules
RUN chown -R node:node /usr/src/app
RUN touch /usr/src/app/.env
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
USER node
RUN npm install

# Bundle app source
COPY --chown=node:node . /usr/src/app
# RUN npm run build
# RUN npm run production

# Run app
EXPOSE 3333
CMD [ "npm", "start"]
