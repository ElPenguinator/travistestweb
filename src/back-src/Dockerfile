FROM node:9

USER node

WORKDIR /home/node/back-src

COPY ./wait-for-it.sh /home/node/back-src

COPY ./package.json /home/node/back-src

COPY ./package-lock.json /home/node/back-src

RUN npm install

EXPOSE 3000

#CMD ["./wait-for-it.sh", "mariadb:3306", "-t", "30", "--", "./wait-for-it.sh", "mongodb:27017", "-t", "30", "--", "npm", "run", "docker-dev"]
CMD ["npm", "run", "docker-dev"]
