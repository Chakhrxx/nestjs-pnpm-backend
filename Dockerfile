FROM node:latest

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /usr/src/app

COPY ["package.json","pnpm-lock.yaml","./"]

RUN pnpm install --frozen-lockfile --production   

COPY . .

RUN pnpm install

RUN pnpm build

EXPOSE 3001

ENTRYPOINT ["pnpm","start:prod"]