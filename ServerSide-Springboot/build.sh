mvn clean package
scp -P 10022 target/*.jar root@mahdavi-bzums.ir:/home/deploy/referensee/referensee.jar

# netstat -tupln | grep 8081
# java -jar referensee.jar