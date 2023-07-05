FROM node:18.16.0 AS build
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]
