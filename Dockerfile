# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000

CMD ["npm", "run", "start"]