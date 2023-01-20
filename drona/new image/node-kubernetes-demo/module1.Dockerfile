FROM node:12.18.3

WORKDIR /app

COPY ./package.json /app
COPY ./src/main.js /app/index.js
COPY ./src/configuration.js /app/configuration.js
COPY ./src/module1 /app/src

RUN npm install

COPY ./.env.example /app

ENV PORT 8090
EXPOSE $PORT

CMD [ "npm", "start" ]

# sudo docker build . -f module1.Dockerfile -t module1

# sudo docker build . -f module1.Dockerfile -t module1 && sudo docker build . -f module2.Dockerfile -t module2