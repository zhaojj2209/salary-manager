FROM node:16.16.0

ENV NODE_ENV=production

WORKDIR /server

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

CMD ["yarn", "start"]
