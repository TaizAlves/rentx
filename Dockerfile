FROM node 

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 33333

CMD ["npm", "run","dev"]