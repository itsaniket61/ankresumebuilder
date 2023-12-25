FROM node:lts-alpine

ENV NODE_ENV=production

# Install dependencies needed for Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Copy both package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install -g yarn

RUN yarn

# Copy the rest of the application code
COPY . .

EXPOSE 8081

# Build the application (if needed)
RUN yarn build

CMD yarn start
