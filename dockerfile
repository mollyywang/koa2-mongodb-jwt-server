FROM node:latest

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# Default NODE_ENV, will be overwritten by envrionment in docker-compose.yml
ENV NODE_ENV production
ENV LISTEN_PORT 80
EXPOSE ${LISTEN_PORT}

RUN yarn build

ENTRYPOINT ["yarn", "start"]