FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

EXPOSE 3000
