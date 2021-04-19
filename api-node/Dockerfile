FROM node:14

WORKDIR ./

COPY ./package.json .

RUN npm install

COPY ./ .

EXPOSE 3333

CMD [ "npm", "start" ]