# Authentication Backend

## Introduction

This project is a simple backend authentication system built with **Node.js, Express.js, MongoDB, and JWT**.

It demonstrates how user authentication works in a backend application. Users can register, receive a JWT token, and store the token in a cookie. Protected routes verify the token before allowing users to access resources, such as creating posts.

The project is mainly created to understand **JWT authentication, cookies, middleware, MongoDB, and Express.js API development**.

## Features

- User Registration
- JWT Authentication
- JWT stored in Cookies
- Token Verification Middleware
- Protected Routes
- MongoDB Database
- Express.js REST API

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser

## Project Structure

```text
project/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── db/
│   └── app.js
│
├── server.js
├── .env
├── package.json
└── README.md
```

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Run

```bash
node server.js
```

Server: `http://localhost:3000`

## Authentication Flow

```
Register
   ↓
Create User
   ↓
Generate JWT
   ↓
Store JWT in Cookie
   ↓
User Request
   ↓
Verify JWT
   ↓
Protected Route
```

## API

### Register

`POST /api/auth/register`

```json
{
  "username": "Adil",
  "email": "adil@gmail.com",
  "password": "123456"
}
```

### Get Users

`GET /api/auth/users`

This route requires a valid JWT token.