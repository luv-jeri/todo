# Todo Project Documentation

## Overview

Todo is a web application that consists of a front-end written in React Js and a back-end written in Node.js, with a MongoDB database. The project uses the Vite bundler for the front-end. 

### Prerequisites
To run this project, you will need to have Node.js installed on your system. If you do not have it installed, you can follow these steps to install it:

1. Go to the [Node.js website](https://nodejs.org/en/).
2. Click on the "Download" button for the current version of Node.js.
3. Run the installer and follow the installation instructions.

## Getting Started
To initialize the project, run the following command:
 > `npm run init`
 
To start the project in development mode, run:
> `npm run dev`
This will open port 4713 for the front-end project.

To start the project in production, run:`
> `npm start`
This will open port 4713 for the front-end project.

## Packages Used

### Backend

| Package | Use Case |
| --- | --- |
| axios | Promise-based HTTP client for making API calls |
| bcryptjs | Library for hashing and salting passwords |
| chalk | Library for styling console output |
| compression | Middleware for compressing responses |
| cookie-parser | Middleware for parsing cookies |
| cors | Middleware for handling Cross-Origin Resource Sharing (CORS) |
| dotenv | Library for loading environment variables from a .env file |
| express | Web application framework for Node.js |
| express-mongo-sanitize | Middleware for preventing MongoDB injection attacks |
| express-rate-limit | Middleware for rate limiting incoming requests |
| jsonwebtoken | Library for generating and verifying JSON web tokens |
| mongodb | MongoDB driver for Node.js |
| mongoose | Object Document Mapper (ODM) for MongoDB |
| mongoose-atlas-search | Plugin for implementing Atlas Search with Mongoose |
| morgan | HTTP request logger middleware |
| nodemailer | Library for sending emails |
| validator | Library for validating and sanitizing input |

### Frontend

| Package | Use Case |
| --- | --- |
| axios | Promise-based HTTP client for making API calls |

### Development

| Package | Use Case |
| --- | --- |
| vite | Web application bundler and development server |
| concurrently | Utility for running multiple commands concurrently |