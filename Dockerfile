FROM node:latest

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install --production

COPY . .

EXPOSE 30001

CMD ["pnpm", "start"]
