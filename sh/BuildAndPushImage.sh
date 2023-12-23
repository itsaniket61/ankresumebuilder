#!/bin/bash

echo -n "Enter Docker Username : "
read DOCKER_USERNAME

echo -n "Enter Docker Password : "
read -s DOCKER_PASSWORD

if [-n "$DOCKER_USERNAME"] && [-n "$DOCKER_PASSWORD"] ; then 
    echo "Please enter Docker Username and Password"
else
    sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
    echo "Docker login Successfully."

    echo -n "Enter Docker Image Name : "
    read DOCKER_IMAGE_NAME
    
    echo -n "Enter Docker Image Tag : "
    read DOCKER_IMAGE_TAG
    
    sudo docker build -t $DOCKER_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG ../

    docker push $DOCKER_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG
fi