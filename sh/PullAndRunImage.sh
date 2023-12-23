#!/bin/bash

export DOCKER_USERNAME=itsaniket61

export DOCKER_PASSWORD=SLN7yybK.kwB#9v

export DOCKER_IMAGE_NAME=ank-resume-builder

export DOCKER_IMAGE_TAG=latest

sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

sudo docker pull $DOCKER_USERNAME/$DOCKER_IMAGE_NAME

sudo docker run -d \
                -e "AI_API_KEY=AIzaSyAb-Ce0fzOjT5WmipYQ1rzkmUFqTTxL-Dw" \
                -e "ACTIVE_PROFILE=prod" \
                -e "SECRET_KEY=Pta-nhii-yrr" \
                -e "HOST_URL=https://qt7vdt4g-3000.inc1.devtunnels.ms"\
                -e "MAX_AI_LENGTH=500" \
                -p 3000:3000 \
                $DOCKER_USERNAME/$DOCKER_IMAGE_NAME