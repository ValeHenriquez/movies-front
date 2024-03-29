FROM node:16 

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3005

RUN npm run build

CMD ["npm", "run", "start"]