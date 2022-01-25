FROM node:17-alpine AS BUILD_IMAGE

#RUN apk update && apk add python make g++ && rm -rf /var/cache/apk/*
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

WORKDIR /usr/src/b42

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY .env ./
COPY src ./src
COPY config ./config
#ENV NODE_ENV=production
RUN npm run build

FROM node:17-alpine

WORKDIR /usr/src/b42

COPY --from=BUILD_IMAGE /usr/src/b42/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/b42/node_modules ./node_modules

COPY .env ./
COPY config ./config
ENV NODE_ENV=production
RUN npm install pm2 -g

CMD [ "pm2-runtime","dist/src/index.js" ]
EXPOSE 4000

