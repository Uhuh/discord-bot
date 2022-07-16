FROM node:16 as base

WORKDIR /home/user/bot

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build