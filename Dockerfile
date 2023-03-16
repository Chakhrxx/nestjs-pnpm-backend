FROM node:latest 

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

RUN pnpm run build

COPY  /app/dist/ ./dist/

COPY  /app/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "dist/main.js" ]