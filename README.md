# Roshabh Technical CRUD App Backend (Node.js)
Roshabh Technical CRUD App is a Node.js application that provides a basic CRUD API (Login , Register , User List, Add New User,Update Exsiting and Delete ) for managing User data in a MongoDB database. The API includes user authentication using JSON Web Tokens (JWT) and password hashing using bcrypt.
# Task-NodeJs-Server
|-- controllers
|   -- user.controller.js     # Contains controller functions for user-related and movie actions
|-- config
|   -- config.js              # Configuration for connecting to the Postgres database
|-- middleware
|   -- user_authenticate.js   # Middleware for user authentication
|-- models
|   -- user.schema.js         # Mongoose User Scheama for defining the database structure
|-- routes
|   -- user.js                # Define API routes for user-related actions
|-- .env                      # Environment variables configuration file
|-- node_modules              # Node.js dependencies (automatically generated)
|-- package.json              # Project dependencies and metadata
|-- package-lock.json         # Lock file for precise dependency management
|-- server.js                 # Entry point for the Node.js server


# Installation
Before running the project, make sure you have the following prerequisites installed on your machine:

Node.js
Npm

# Follow these steps to set up and run the project:
cd Task-NodeJs-Server
=> npm install

# Database Setup:
I already Added Database URL , But if you want to add New Database just change the database url


# Start the Node.js server:
- npm start
The server will run on port 4000 by default. You can modify the port in the .env file if needed.

# API Endpoints

POST /api/login - Log in as an existing user and receive a JWT.

GET /api/get-all-users - Get a list of Users.

POST /api/add-user - Add a new User to the user's list.

PUT /api/edit-user/:id - Update User details by ID.

DELETE /api/delete-user/:id - Delete a user from the user's list.

# User Authentication
This project uses JWT for user authentication. To access protected routes, you must include a valid JWT token in the request header as follows:


# Rishabh Technical CRUD App Angular

Rishabh Technical CRUD App is an Angular application that provides a user interface for managing users data using a CRUD interface. It includes login and registration functionality, users details ist display in table and delete ,edit and update crud uses, and utilizes JWT (JSON Web Tokens) for user authentication. The app also features several Angular components, services, and interceptors for enhanced functionality.

# Project Structure
Task-Angular-Front
|-- src
|   |-- app
|   |   |-- auth-guard
|   |   |   `-- auth.guard.ts
|   |   |-- auth-service
|   |   |   `-- auth.service.ts
|   |   |-- error-interceptor
|   |   |   `-- error.interceptor.ts
|   |   |-- token-interceptor
|   |   |   `-- token.interceptor.ts
|   |   |-- login
|   |   |   |-- login.component.html
|   |   |   |-- login.component.ts
|   |   |-- register
|   |   |   |-- register.component.html
|   |   |   |-- register.component.ts
|   |   |-- home
|   |   |   |-- home.component.html
|   |   |   |-- home.component.ts
|   |-- assets
|   |   |-- images
|   |   |   `-- logo.png
|-- node_modules
|-- package.json
|-- package-lock.json
|-- angular.json
|-- tsconfig.json
|-- README.md

# Installation
Before running the Angular app, make sure you have the following prerequisites installed on your machine:

Node.js and Angualr Cli 12.2.5 to run Project 
# Follow these steps to set up and run the project:
cd Task-Angualr-Front

# Install project dependencies using npm (use the --force flag to ensure dependencies are reinstalled):
npm install --force

# Start the Angular development server:
ng serve

# environment folder for Backend API 
Default set in development : http://localhost:5000/api
Default set in Production : http://noblescreation.com/api


