FROM node:9

USER node

WORKDIR /home/node/front-src

COPY ./package.json /home/node/front-src

COPY ./package-lock.json /home/node/front-src

RUN npm install

EXPOSE 4200

CMD ["npm","start"]
