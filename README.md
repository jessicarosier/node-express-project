# node-express-project

## Description
This is a simple Node.js project using Express.js framework. This is a simple project to help me understand the MVC structure in Node.js.
I will also be using this project to learn how incorporate other technologies into a Node.js project such as Redis, Python, AWS S3, and more.

## Prerequisites
To run this project, you will need the following installed on your machine:
1. Node.js
2. npm
3. Python
4. pip
5. Redis


## Installation
1. Clone the repository
2. Run `npm install`
3. Run `python -m venv venv` to create a python virtual environment
4. Run `source venv/bin/activate` to activate the virtual environment
5. Run `pip install -r requirements.txt` to install the required python packages
6. Run `npm install -g nodemon` to install nodemon globally
7. Run `nodemon app.js` to start the server
8. Visit `http://localhost:8080` in your browser


## Project Structure
The project structure is as follows:
```
.
├── app.js                 # Entry point for the application
├── package.json           # Contains metadata and dependencies
└── public/                # Static assets (css, js, images)
    ├── css/               # CSS files
    ├── images/            # Image files
    └── js/                # Frontend JavaScript files
└── src/
    ├── config/            # Configuration files
    ├── dao/               # Data access objects - database queries
    ├── logic/             # Complex logic between routes and data access
    ├── models/            # Data models representing database objects
    ├── python/            # Python scripts interacting with Node environment
    ├── routes/            # Application endpoints
    ├── utils/             # Utility functions used throughout the app
    └── views/             # EJS templates for the application
```



