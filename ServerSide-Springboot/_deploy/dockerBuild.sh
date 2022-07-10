#!/bin/sh

imageName='qu-answer'
echo $imageName

# shellcheck disable=SC2046
sudo docker rm $(docker stop $(docker ps -a -q --filter ancestor=$imageName --format="{{.ID}}"))

sudo docker rmi -f $imageName

sudo docker build -t $imageName .


rm -rf docker-compose.yml

#volumeLog='log:/log'

echo "version: '3'"							>> docker-compose.yml
echo "services:"							>> docker-compose.yml
echo "    "$imageName":"						>> docker-compose.yml
echo "        container_name: '"$imageName"'"				>> docker-compose.yml
echo "        image: "$imageName					>> docker-compose.yml
echo "        networks:"						>> docker-compose.yml
echo "            - microservice-net"					>> docker-compose.yml
#echo "        volumes:"							>> docker-compose.yml
#echo "            - "$volumeLog						>> docker-compose.yml
#echo "            - "$volumeFileResource				>> docker-compose.yml
#echo "            - "$volumeFileResourceSecure				>> docker-compose.yml
#echo "            - /etc/localtime:/etc/localtime:ro"			>> docker-compose.yml
echo "        ports:"						>> docker-compose.yml
echo "            - '8081:8081'"				>> docker-compose.yml
echo "networks:"						>> docker-compose.yml
echo "    microservice-net:"						>> docker-compose.yml
echo "        external:"					>> docker-compose.yml
echo "            name: microservice-net"				>> docker-compose.yml

sudo docker-compose up
