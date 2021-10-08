FROM node:16-alpine3.11
WORKDIR /app
COPY . .
RUN npm install --only=production
EXPOSE 3000
ENTRYPOINT ["npm","run","prod"]
