#!/bin/bash

# Check if .setenv file exists
if [ -f .setenv ]; then
    source .setenv
else
    echo "Creating .setenv file..."
    
    # Prompt user for Docker credentials
    echo -n "Enter Docker Username : "
    read DOCKER_USERNAME

    echo -n "Enter Docker Password : "
    read -s DOCKER_PASSWORD

    # Create .setenv file with Docker credentials
    echo "DOCKER_USERNAME=$DOCKER_USERNAME" > .setenv
    echo "DOCKER_PASSWORD=$DOCKER_PASSWORD" >> .setenv

    echo -e "\n.setenv file created successfully."
fi

# Check if DOCKER_USERNAME and DOCKER_PASSWORD are set
if [ -z "$DOCKER_USERNAME" ] || [ -z "$DOCKER_PASSWORD" ]; then
    echo "Error: DOCKER_USERNAME and DOCKER_PASSWORD must be set in the .setenv file."
    exit 1
fi

# Docker login
sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
echo "Docker login Successful."

# Continue with the rest of the script
export DOCKER_IMAGE_NAME="ankresumebuilder"

export DOCKER_IMAGE_TAG="latest"

# Pull the Docker image
docker-compose pull $DOCKER_IMAGE_NAME

# Run the Docker container using docker-compose
docker-compose up -d
