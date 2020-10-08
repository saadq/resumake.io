#
FROM node:10-alpine

WORKDIR /home/node/app/client
RUN chown -R node:node /home/node/app/client

COPY package*.json ./

USER node

RUN npm install
COPY --chown=node:node . .

EXPOSE 4000

CMD [ "npm", "start"]




