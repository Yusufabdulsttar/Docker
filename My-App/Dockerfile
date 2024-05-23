FROM node:alpine

WORKDIR /my_app

COPY package.json .

RUN mkdir /public

COPY public ./public

WORKDIR /my_app

RUN npm install

COPY index.js .

CMD [ "npm","start" ]
