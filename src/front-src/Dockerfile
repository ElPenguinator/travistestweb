FROM node:9

USER node

RUN mkdir -p /home/node/app/front-src

WORKDIR /home/node/app/front-src

COPY ./package.json /home/node/app/front-src

COPY ./package-lock.json /home/node/app/front-src

RUN npm install

EXPOSE 4200

CMD ["npm","start"]
