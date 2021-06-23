# Microsite Starter Template

## Table of contents
- [Setup](#setup)
- [Overview](#overview)
    - [Login](#login.js)
    - [Register](#register.js)
    - [Reset Password](#resetpassword.js)
    - [Private Route](#privateroute.js)
- [Special Topics](#specialtopics)
    - [Password Information](#passwordinformation)
    - [JSON Web Token](#jwt)
    - [Email Verfication](#emailverification)
- [Help](#help)

## Setup
1. Within your local terminal, navigate to a folder you'd like this project to live in. Once there, run:
```
git clone https://github.com/sfdc-qbranch/Microsite-Starter-Template.git
```
2. Within your project, run:
```
npm install    [Note: this step expects you have Node.js and npm on your computer]
```
3. Run the project.
```
npm start
```
4. In Login, Register, and ResetPassword Component Files, replace the string <CUSTOMER_EMAIL_DOMAIN> with the email domain of your customer. 
```
Example: email.indexOf("@lululemon.com", email.length - "@lululemon.com".length) !== -1
```

# Overview

## Login.js
#### Required Edits
1. Line 43: replace <CUSTOMER_EMAIL_DOMAIN> with the email domain of your customer [see step 4 in the SetupGuide section]

#### Overview 
The Login component allows the user to login if they have previously created and verified their account. This component stores a cookie once the user has successfully logged in that will allow them to access components in <PrivateRoutes />. This cookie is valid for 8hrs so after 8hrs the user will be redirected back to the Login component to login again for a new valid accessToken.

## Register.js
#### Required Edits
1. Line 53: replace <CUSTOMER_EMAIL_DOMAIN> with the email domain of your customer [see step 4 in the SetupGuide section]

#### Overview 
The Register component allows the user to create an account to view the microsite. This component requires a valid email, password and confirm password that match the criteria necessary for each of those fields. Once the user has entered valid entries, an email is sent to their email where they need to click the link to verify their account. Once this process is finished, they will be redirected back to the Login screen to login.

## ResetPassword.js
#### Required Edits
1. Line 50: replace <CUSTOMER_EMAIL_DOMAIN> with the email domain of your customer [see step 4 in the SetupGuide section]

#### Overview 
The Reset Password component allows the user to reset their password or reverify their account if their verification email expired. This component requires a valid email, password and confirm password that match the criteria necessary for each of those fields. Once the user has entered valid entries, an email is sent to their email where they need to click the link to verify the password change and verify their account. Once this process is finished, they will be redirected back to the Login screen to login.

## PrivateRoute.js 
The PrivateRoute component is a wrapper class for the react-router's Route component. In PrivateRoute, we send the local cookie 'accessToken' to CX Shield to determine if the token is valid (valid = the user has logged in and the session length (8hrs) has not been expired). If the token is valid, the endpoint will be shown but if the token is not valid, the user will be redirected to the Login screen. 

NOTE: See App.js for an example

# SpecialTopics

## PasswordInformation

The password regex is as follows: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,30}$/

Password Requirements:
* Must be between 8 and 30 characters.
* Must have 1 digit.
* Must have one lowercase character.
* Must have one uppercase character.
* Must have one special character. They include !@#$%^&*.

## JWT

Every time a user logs in, a new JSON Web Token is sent to the microsite and stored in a cookie as 'accessToken'. [Login.js,line 32]
When a user tries to move to any route that is a <PrivateRoute /> (see App.js), this accessToken is sent to CX Shield and verified. If the token is valid, (valid = a properly formed JSON Web Token that can be decrypted by the JWT Secret on server and the token is not expired) then TRUE is returned. If the token is invalid, FALSE is returned. This response determines whether the user is allowed to navigate to that <PrivateRoute /> component. 

NPM Cookie Package: https://www.npmjs.com/package/js-cookie

## EmailVerification

Once a valid user (valid = Salesforce employee or matches the customer email domain) wants to create an account, they will register their email and validate it by clicking on the link in the email sent to them. The email link process:
1. GET Request from Gmail (or other vendor) to CX Shield -> set account to valid=TRUE
2. GET Request from CX Shield to the returnUrl stored in the JSON Web Token which is the url that sent the email verification request (aka the microsite url).
3. Once the user has been redirected back to the microsite url, the user will need to login to gain access to the microsite.

Users have 8 hours to validate their email once a email is sent. If they do not do it in this time frame, they will need to their password to confirm their account.

## Help
Feel free to reach out to either of the creators for answers on questions relating to the Microsite Starter Template.

Creators: Evan Smith and Amanda Szampias.


