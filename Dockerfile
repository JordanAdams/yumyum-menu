FROM node:lts

WORKDIR /app

ENV NODE_ENV production

COPY package.json .
COPY yarn.lock .

RUN yarn install --production

COPY . .


CMD ["yarn", "start"]
