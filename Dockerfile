# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 3000

CMD ["npm", "run", "start"]