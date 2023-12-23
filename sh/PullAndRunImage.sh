#!/bin/bash
exho "Enter Docker Username : "
read DOCKER_USERNAME

echo "Enter Docker Password : "
read -s DOCKER_PASSWORD

echo "Enter Image Name : "
read DOCKER_IMAGE_NAME

echo "Enter Image Tag : "
read DOCKER_IMAGE_TAG

sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

sudo docker pull $DOCKER_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG

sudo docker run -d \
                -e "AI_API_KEY=AIzaSyAb-Ce0fzOjT5WmipYQ1rzkmUFqTTxL-Dw" \
                -e "ACTIVE_PROFILE=prod" \
                -e "SECRET_KEY=Pta-nhii-yrr" \
                -e "HOST_URL=https://qt7vdt4g-3000.inc1.devtunnels.ms"\
                -e "MAX_AI_LENGTH=500" \
                -e "BLOB_EXPIRY=60"\
                -p 3000:3000 \
                $DOCKER_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG