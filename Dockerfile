
FROM node:18-alpine

COPY . /var/www

WORKDIR /var/www

RUN npm install -g pnpm
RUN pnpm install

ENTRYPOINT ["pnpm","start:dev"]