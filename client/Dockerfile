FROM node:10
WORKDIR /app
COPY package*.json ./
RUN ls
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]
