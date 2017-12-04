FROM node:9

USER node

WORKDIR /home/node

COPY ./package.json /home/node

COPY ./package-lock.json /home/node

RUN npm install

EXPOSE 4200

CMD ["npm","start"]
