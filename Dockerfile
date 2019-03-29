FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY src/. /app
CMD node index.js
EXPOSE 8081
