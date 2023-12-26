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

RUN npm uninstall tailwindcss postcss autoprefixer
RUN npm install tailwindcss@latest postcss@latest autoprefixer@latest


COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY start.sh ./
RUN chmod +x start.sh

# Install dependencies
RUN npm install yarn

RUN yarn

# Copy the rest of the application code
COPY . .

RUN chmod +x start.sh

EXPOSE 8081

# Build the application (if needed)
RUN yarn build

CMD ["sh","./start.sh"]
