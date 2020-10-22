FROM node:latest
WORKDIR /usr/src/
COPY package.json ./
RUN yarn install
COPY . .
CMD ["yarn", "start"]