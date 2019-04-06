FROM node:10
WORKDIR /app
COPY package*.json ./
RUN ls
RUN npm install
COPY . .
RUN ls
CMD ["npm", "run", "serve"]






