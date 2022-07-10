<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>
<body>
<div style="margin-top: 10px">Dear, ${name}</div>
<div>
You have received this email because you have activated receiving notifications when questions are added to the <a href="https://www.quanswer.com/" rel="www.quanswer.com">www.quanswer.com</a> platform with the following tags:</div>
<br/>

<#list tags as tag>
  <p>${tag},
</#list>
<br/><br/>

<div>Here you can find the list of new questions with the above tags:</div>

<#list questions as question>
  <p><a href="${questionHyperLink}${question.id}" rel="link">${question.title}</a>
</#list>

<div>If you would like to deactivate receiving notification, you can do that from your profile section on the <a href="https://www.quanswer.com/" rel="www.quanswer.com">www.quanswer.com</a> platform.</div>

<br/>
<div>Thanks, </div>
<br/>
<div>Your QuAnswer Team </div>

</body>
</html>