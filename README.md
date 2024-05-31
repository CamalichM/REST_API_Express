# REST API with CRUD Operations
#### Marco Antonio Camalich Pérez
REST API with CRUD operations. 

## Overview
This project is a REST API built using Node.js and Express to manage restaurant information. It includes CRUD (Create, Read, Update, Delete) operations for the restaurants. The API also provides a special endpoint to calculate statistics about restaurants within a certain radius of a given latitude and longitude.

## Features
- CRUD operations for managing restaurants.
- Endpoint for calculating statistics of restaurants within a radius.
- Relational database schema for storing restaurant information.
- Integration with a cloud platform (e.g., Railway, Render) for deployment.
- Postman collection for testing the API.

## Technologies Used
- Node.js
- Express
- SQLite (for database)
- Postman (for testing)

## Installation
1. Clone the repository: `git clone https://github.com/CamalichM/REST_API_Express.git`
2. Install dependencies: `npm install`
3. Run the server: `npm start`

## API Endpoints
- GET /restaurants: Get all restaurants
- GET /restaurants/:id: Get a restaurant by ID
- POST /restaurants: Create a new restaurant
- PUT /restaurants/:id: Update a restaurant
- DELETE /restaurants/:id: Delete a restaurant
- GET /restaurants/statistics?latitude=x&longitude=y&radius=z: Get statistics for restaurants within a radius

## Database Schema
```sql
CREATE TABLE Restaurants (
    id TEXT PRIMARY KEY,
    rating INTEGER,
    name TEXT,
    site TEXT,
    email TEXT,
    phone TEXT,
    street TEXT,
    city TEXT,
    state TEXT,
    lat FLOAT,
    lng FLOAT
);
```

### Deployment


### Postman Collection
You can test the API using the following Postman Collection:

### Bonus Points
- Git was used for version control with clear commit messages and branching strategy.
- HTTP verbs are correctly used for each operation.
- Followed good programming practices such as code readability, error handling, and modularization.

### Contact
For any inquiries or feedback, please contact la_pazcamalich@hotmail.com
