# Use official Node.js LTS image
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 6400

RUN npm run build
CMD ["npm", "start"]