FROM node:13.8.0

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/node_modules
RUN mkdir -p /usr/local/lib/node_modules

RUN chown -R node:node /usr/src/app
RUN chown -R node:node /usr/local/lib/node_modules
RUN touch /usr/src/app/.env
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
USER node
RUN npm install

# Bundle app source
COPY --chown=node:node . /usr/src/app
COPY --chown=node:node . /usr/local/lib/node_modules
RUN npm i @adonisjs/cli

RUN adonis migration:refresh
RUN npm run build
RUN npm run production

# Run app
EXPOSE 3333
CMD [ "npm", "start"]
