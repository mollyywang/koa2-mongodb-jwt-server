FROM node:latest


ADD ./package.json /app/package.json
WORKDIR /app

RUN npm install 

ADD ./env.yaml /app/env.yaml
ADD ./src /app/src
WORKDIR /app

ENTRYPOINT npm run dev