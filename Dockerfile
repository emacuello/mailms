FROM node:20.12.2-buster-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


CMD ["npm", "run", "start"]
