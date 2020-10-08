FROM node:10-alpine

#so far these are the only package you need to run the first six templates
#if this causes an error because a package needs to be installed you can install
#the full version of texlive which is texlive-full
RUN apk update && apk add --no-cache texlive texmf-dist-latexextra texlive-xetex texlive-luatex 


WORKDIR /home/node/app/server
RUN chown -R node:node /home/node/app/server 


USER node

COPY package*.json ./


RUN npm install
COPY --chown=node:node . .

EXPOSE 4001

CMD ["npm", "start"]


