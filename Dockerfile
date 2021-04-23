FROM node:lts-alpine

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY pages /app/pages
COPY public /app/public
COPY styles /app/styles


WORKDIR /app

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]
