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
RUN npm install

RUN npm uninstall tailwindcss postcss autoprefixer
RUN npm install tailwindcss@latest postcss@latest autoprefixer@latest

RUN npx tailwindcss init -p

RUN npm uninstall tailwindcss postcss autoprefixer
RUN npm install tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9

# Copy the rest of the application code
COPY . .

EXPOSE 8081

# Build the application (if needed)
RUN npm run build

CMD npm run start
