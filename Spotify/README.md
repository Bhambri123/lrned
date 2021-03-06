# Spotify SPA website

A simple SPA website using Spotify's website/desktop concept as base.

## Getting Started

Before you start working with Spotify, consider following these steps.

### Prerequisites

Install the following Software before you install Spotify project.

```
MongoDB Shell / Server
// If Windows user
    |_ Use gitbash app to get a Unix Terminal or use latest PowerShell
*npm
|_*nodejs
|_*angular-cli

```
* Use Latest versions

### Installing

A step by step series to get development enviroment working properly.

#### NodeJS's Express client (API RESTful module)

Start mongod service (Mongo's demon)
```

Start Mongo Shell and Create the db

```
user@user-pc:~$ mongo

    // If Windows user
        |_ Go to MongoDB path (PATH/MongoDB/Server/YOUR_VERSION_HERE/bin) and run mongo.exe

// Mongo's Shell command    
> use mean

```
You can close now the Mongo's Shell if you want.
Leave Mongo's Server service running / listening.

Install dependencies and Start API RESTful server (NodeJS/Express)

```
user@user-pc:~/mean-spotify$ npm install
// The API module uses nodemon, we created this shortcut w nodemon
user@user-pc:~/mean-spotify$ npm start
    // If all ok, you'll see this output
        |_ Connected to DB.
        |_ API REST Server listening on: localhost:3977

```

You can test now with your REST Client the API modules. (Take a look at route modules first).

#### Angular Client

Install Angular's Spotify dependencies and start it

```
user@user-pc:~/mean-spotify$ ng serve
    // If all ok, you'll see this output
        |_ ** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
        |_ i : Compiled successfully.

```

You can now go to your favorite browser and use the SPA website entering the following web address:
```
http://localhost:4200/
```

## Deployment

You may use AWS's AC2 module to deploy the MEAN app.

## Built With

* [Bootstrap](https://getbootstrap.com/) - The web-design framework used
* [npm](https://www.npmjs.com/) - Dependency Management
* [NodeJS](https://nodejs.org/en/) - Server
* [Angular 7+](https://angular.io/) - Front-End framework
* [MongoDB](https://www.mongodb.com/download-center/community?jmp=nav) - Database



