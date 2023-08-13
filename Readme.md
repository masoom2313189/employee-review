# Employee Review System

A simple app where employees can review other employees and admins can update employee information

## Features

- Sign Up / Sign In Page for employees and admin
- Admin view to update employee and assign reviews to other employees
- Admins can create new employess and make another employee an admin

## Screenshots

- Sign Up
  ![Sign Up](/images/signup.png)

- Sign In
  ![Sign In](/images/signin.png)

- Admin View
  ![Admin View](/images/admin_view.png)

- Employee List
  ![Employee List](/images/employee_list.png)

## Tech Stack

- [Node.js](https://nodejs.org/en/): An asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.

- [Express](https://expressjs.com/): Express is a minimal and flexible Node.js web application framework

- [mongoDB](https://www.mongodb.com/): A NoSQL database which uses JSON-like documents

- [Passport](http://www.passportjs.org/): Passport is authentication middleware for Node.js

## Setup

Run `npm install` to install required dependencies
Create .env file in config directory
Environment Variables:

- PORT = [Your Port]
- SECRET = [Your Secret]
- MONGO_URI = [Your MongoDB Ur]
