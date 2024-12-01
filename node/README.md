# Basic Banking System

This repository contains a basic banking system web  application developed as part of Task 1 for my web development and designing internship at The Sparks Foundation under Graduate Rotational Internship Program (GRIP) for batch May 2024.

## Features

- **Homepage**: 
  - Two main buttons: 'View Customers' and 'View All Transfers'.

- **View Customers**: 
  - Displays up to 10 customers stored in a MongoDB database.
  - Basic details such as name, email, current balance, etc.
  - Ability to select a customer to view more details and initiate money transfers.

- **View All Transfers**: 
  - Contains a history of all transactions made between customers.

- **Flow**: 
  - Homepage > View All Customers > Select and View One Customer > Transfer Money > Select Customer to Transfer To > View All Transfers.

## Screenshots and Demo video

https://github.com/harmeetsingh11/TSF-GRIP-Basic-Banking-System/assets/130365071/3c939324-980a-47a1-b1b6-d6491da94ac3


## Usage

- **Homepage**: Navigate to the homepage to see the options 'View Customers' and 'View All Transfers'.
- **View Customers**: Click on 'View Customers' to see the list of customers. Select a customer to view details and initiate a money transfer.
- **Transfer Money**: From the selected customer's page, initiate a transfer by choosing another customer to transfer money to.
- **View All Transfers**: Click on 'View All Transfers' on the homepage to see the history of all transactions.

## Tech Stack

- **Frontend**: <br>
   
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

- **Backend**: <br>
  
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  
- **Database**: <br>

   ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Dependencies

- [body-parser](https://www.npmjs.com/package/body-parser) (^1.20.2): Middleware for parsing incoming request bodies in a middleware before your handlers, available under the req.body property.
- [cors](https://www.npmjs.com/package/cors)(^2.8.5): Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js, allowing controlled access to resources from different domains.
- [express](https://www.npmjs.com/package/express)(^4.19.2): Fast, unopinionated, minimalist web framework for Node.js, providing a robust set of features for building web applications.
- [mongoose](https://www.npmjs.com/package/mongoose)(^8.3.5): MongoDB object modeling tool designed to work in an asynchronous environment, providing a straight-forward, schema-based solution to model your application data.
- [open](https://www.npmjs.com/package/open)(^10.1.0):Cross-platform package to open files, directories, and URLs in the user's preferred application.

## Project Structure

The project is organized into the following structure:

```bash
TSF-GRIP-Basic-Banking-System/
├── frontend/
│ ├── app.js
│ ├── index.html
│ └── style.css
├── models/
│ ├── customer.js
│ └── transfer.js
├── routes/
│ ├── customer.js
│ └── transfer.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

### Description of Files and Folders

- **frontend/**: Contains frontend related files.
  - `app.js`: Main JavaScript file for frontend logic.
  - `index.html`: The main HTML file and entry point of the application.
  - `style.css`: The main stylesheet for the application.

- **models/**: Contains Mongoose schemas.
  - `customer.js`: Schema definition for the customer model.
  - `transfer.js`: Schema definition for the transfer model.

- **routes/**: Contains route definitions.
  - `customer.js`: Routes for handling customer-related requests.
  - `transfer.js`: Routes for handling transfer-related requests.

- `.gitignore`: Specifies which files and directories to ignore in the repository.
- `package-lock.json`: Automatically generated for any operations where npm modifies the node_modules tree or package.json.
- `package.json`: Contains metadata about the project and its dependencies.
- `README.md`: The readme file providing an overview and details about the project.
- `server.js`: The main server file setting up the Express.js application and starting t
  

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:harmeetsingh11/TSF-GRIP-Basic-Banking-System.git

2. Run the following command to install the dev dependencies:
   ```bash
   npm install
   or
   npm i 

3. Open two terminal instances:

    - In one terminal, run MongoDB:
        ```bash
        mongod
    - In the other terminal, navigate to the project directory and start the application. This will automatically open `index.html` in your default browser:
  
       ```bash
       npm start
4. To initialize the customer schema database with dummy data, run the following command the first time you start the project:
   ```bash
   curl -X POST http://localhost:3000/api/customers/initialize
 
