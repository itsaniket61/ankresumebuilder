FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /app

# Copy both package.json and package-lock.json (if exists)
COPY package*.json ./

RUN npm install -g npm@latest

RUN npm cache clean --force

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Build the application (if needed)
RUN npm run build

CMD npm run start
