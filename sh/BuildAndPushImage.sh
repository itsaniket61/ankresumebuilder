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

DOCKER_IMAGE_NAME="ankresumebuilder"

# Use default tag 'latest' and current date (YYYYMMDD)
DOCKER_IMAGE_TAG_LATEST="latest"
CURRENT_DATE=$(date +"%Y%m%d")

# Prompt user for the custom tag
echo -n "Enter Docker Image Tag (default is current date $CURRENT_DATE): "
read CUSTOM_TAG
DOCKER_IMAGE_TAG_DATE=${CUSTOM_TAG:-$CURRENT_DATE}

# Build and push Docker images
sudo docker build -t $DOCKER_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG_LATEST -t $DOCKER_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG_DATE ../
sudo docker push $DOCKER_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG_LATEST
sudo docker push $DOCKER_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG_DATE

echo "Docker images built and pushed successfully."
