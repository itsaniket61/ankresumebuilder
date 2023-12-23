FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /app

# Copy the entire local project directory into the Docker image
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start your application
CMD npm run dev