FROM node:18 As development

WORKDIR /usr/src/app

COPY  . .
COPY node_modules ./node_modules
COPY dist ./dist
COPY src ./src
