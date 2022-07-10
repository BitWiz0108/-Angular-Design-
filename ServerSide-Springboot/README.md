# Server setup
- Download the source code
- Import project as existing maven project in eclipse
- Build maven project using 'clean install' command
- Start server with main class under package - ir.mjimani.basespringboot

# DB setup on local
- Install Mongo compass 
- Create Database with name : quAnswer
- Create Collections: question, signupRequest, tag, user
- Import sample records from src/test/resources for respective collections (Click on 'ADD DATA' green button from Mongo DB Compass and Select 'Import File' option

# Angular project setup
- Install Node if not already installed : https://nodejs.org/en/download/
- Open CMD and go to project location where package.json file exist
- Execute command : ng build
- To start Angular project : ng serve
- ---
The updated guideline (the above section for the angular project setup doesn't work properly):
We need these steps everytime:

1) Goto -> https://nodejs.org/en/download/releases/I ( if we have this version then skip)
2) In search bar type "14.17.1" and download it ( if we have this version then skip)
3) Remove the project and clone the code again
4) Run npm i -D typescript@4.1.5 ( if we have this version then skip )
   4.1) Run "ng v" and check Typescript version)
5) npm uni angular-ng-autocomplete"
6) npm i angular-ng-autocomplete@2.0.7
7) Run npm install
8) Run ng serve

# Other Project Configuration
- To point local Angular Project to local Spring boot server update '\src\app\config\serverConfig.ts' 
- To update the user email notification scheduler for activated tags time : application.yml file require to be updated with 'user.tags.notification.cron' property
- To update the question hyper link added in user email (send during user email notification scheduler for activated tags) : application.yml file require to be updated with 'user.tags.notification.questionHyperLink'
- Update Google API key for YouTube API consumption update '\src\app\config\serverConfig.ts' 

# Issues related(if occurs)
- Issue 1: java.lang.ClassNotFoundException: javax.xml.bind.DatatypeConverter
 This is the exception mean Datatypeconverter class is missing.
 Solution is:
 add dependency in pom.xml and update it:
    <dependency>
        <groupId>javax.xml.bind</groupId>
        <artifactId>jaxb-api</artifactId>
        <version>2.3.0</version>
    </dependency>
- Issue 2: when issue is created due to any library
 Solution is:
 Adjust the issued library version according to angular version.
    e.g:
    1- Downgrade the angular-ng-autocomplete to 2.0.5
    2- npm audit fix
    and thats it

