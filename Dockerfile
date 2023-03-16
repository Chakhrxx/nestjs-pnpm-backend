FROM node:latest

COPY . /var/www

WORKDIR /var/www

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

EXPOSE 3000

ENTRYPOINT ["pnpm","start"]