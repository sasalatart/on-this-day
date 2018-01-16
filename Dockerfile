FROM node:8-alpine

LABEL maintainer="Sebastian Salata R-T <SA.SalataRT@GMail.com>"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

ENV NODE_ENV=production

COPY . /usr/src/app
RUN yarn build

EXPOSE 9000

CMD ["yarn", "start"]
