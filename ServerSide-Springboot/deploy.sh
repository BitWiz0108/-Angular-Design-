#!/bin/sh

imageName='qu-answer'

pro="$1"
echo $pro

# Remove target directory and old deploy
rm -rf target
rm -rf _deploy/app.jar
rm -rf _deploy/docker-compose.yml
# build
mvn clean package -P$pro

# shellcheck disable=SC2039
if [ "$pro" == "local" ]; then
  # copy jar file
  cp target/*.jar _deploy/app.jar

  cd _deploy
  ./dockerBuild.sh
elif [ "$pro" == "prod" ]; then
  echo 'sdsds'
elif [ "$pro" == "test" ]; then
  scp -P 10022 target/*.jar root@mahdavi-bzums.ir:/home/deploy/referensee/referensee.jar
fi
