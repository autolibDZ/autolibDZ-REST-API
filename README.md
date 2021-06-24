# This is AutolibDZ REST API made by solveIT 


This is the initialized repository from the blog post ['Bulletproof node.js project architecture'](https://bezkoder.com/node-js-express-sequelize-mysql/)

Please read the blog post in order to have a good understanding of the project architecture.

## setup

- clone the `autolibDZ` repo.
- install the dependencies.
- run `npm start`.

## tests
To work in test environment, run:
- npm run start-test (if you have a linux kernel)
- npm run start-test-windows (if you're on linux)

## Development

We use `node` version `14.15.5`

```

You must have postgres installed on your machines

```

The first time, you will need to run

```

** npm install **
 
** npm install nodemon -g ** (in case it is not installed in your computer)

```

Then just start the server with

```
** npm start **

```
It uses nodemon for livereloading :peace-fingers: 

```

Open http://localhost:4000 to view it in the browser.

## remarks

- The connection with the database was made at app/models/index.js
- .env contains all the database information
- If you want to manipulate or view the database: create a server on pgadmin, name it and add the params that are available in .env file and then enter the server.
- We're using winston as a logging library
- We're using joi as chema description language and data validator for JavaScript

## coding practices 

You should check "la charte de codage" before coding, where you will find two parts : general convensions 

and best practices for RESP API design.

 **Example error**

 - When an access token is invalid

 ```json

 {
 "error": "invalid_access_token",
 "message": "Invalid access token",
 "status": 400
}

 - When the token of the user is unauthorized to access the resource
 
 ```json

 {
 "error": “authorization_required",
 "message": "Authorisation required",
 "status": 403
}

 - When validation is prohibited for the token of the user
 
 ```json

{
 "error": "validation_error",
 "message": "validation denied",
 "status": 400
}
 - When the resource is not found
 
 ```json

{
 "error": "not_found",
 "message": "No such content with id:\”4532\“",
 "status": 404
}
 - When a similar action has already been performed on the resource
 
 ```json

{
 "error": "command_locked",
 "message": "<Resource> is already locked for <action>",
 "status": 409
}
 - When a request is made in http and not in https
 
 ```json

{
 "error": "routing_error",
 "message": "Request must be in https",
 "status": 412
}
 
 ```




