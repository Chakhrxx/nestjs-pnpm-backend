FROM node:18 As development

WORKDIR /usr/src/app

COPY  ["Dockerfile","nest-cli.json","package.json","pnpm-lock.yaml","tsconfig.build.json","tsconfig.json","./"]
ADD src ./src
