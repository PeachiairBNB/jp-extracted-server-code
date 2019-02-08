FROM node:8

WORKDIR usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3008

CMD ["npm", "run", "initAll"]
