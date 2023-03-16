FROM node:latest

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY /usr/src/app/node_modules ./node_modules

RUN pnpm run build

COPY /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
