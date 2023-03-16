FROM node:latest As development

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /usr/src/app

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm fetch --prod

COPY --chown=node:node . .
RUN pnpm install

USER node

CMD [ "node", "dist/main.js" ]