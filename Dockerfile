FROM node:13.8.0

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/node_modules
RUN chown -R node:node /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
USER node
RUN npm install

# Bundle app source
COPY --chown=node:node . /usr/src/app
RUN npm run build

# Run app
EXPOSE 3333
CMD [ "npm", "start"]
#ENTRYPOINT ["npm run watch", "npm run watch-server"]
#CMD [ "sh", "-c", "npm run watch && npm run watch-server" ]
