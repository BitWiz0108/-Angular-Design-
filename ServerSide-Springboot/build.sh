mvn clean package
scp -P 10022 target/*.jar root@mahdavi-bzums.ir:/home/deploy/quAnswer/quAnswer.jar

# netstat -tupln | grep 8081
# java -jar quAnswer.jar