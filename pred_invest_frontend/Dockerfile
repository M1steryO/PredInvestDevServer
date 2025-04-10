FROM node:20-alpine AS build

WORKDIR /pred_invest

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


EXPOSE 3000

CMD ["npm", "run", "dev"]
