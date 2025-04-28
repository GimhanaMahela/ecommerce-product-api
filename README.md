# 🛍️ E-commerce Product API

![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-4-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6-orange)
![JWT](https://img.shields.io/badge/JWT-Auth-purple)

A modern REST API for e-commerce product management with secure JWT authentication and role-based access control.

## ✨ Features

- **User Authentication**
  - Registration with email/password
  - JWT token generation
  - Protected routes
- **Product Management**
  - Full CRUD operations
  - Category filtering
  - Pagination
- **Security**
  - Role-based authorization (User/Admin)
  - Password encryption
  - Rate limiting (coming soon)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+
- npm 9+

📚 API Documentation

### Authentication

| Endpoint         | Method | Description                | Auth Required |
|------------------|--------|----------------------------|---------------|
| /auth/register   | POST   | Register new user          | No            |
| /auth/login      | POST   | Login existing user        | No            |
| /auth/me         | GET    | Get current user profile   | Yes           |

### Products

| Endpoint         | Method | Description                | Auth Required |
|------------------|--------|----------------------------|---------------|
| /products        | GET    | Get all products           | No            |
| /products/:id    | GET    | Get single product         | No            |
| /products        | POST   | Create new product         | Admin         |
| /products/:id    | PUT    | Update product             | Admin         |
| /products/:id    | DELETE | Delete product             | Admin         |


Example:

curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "role": "user"
  }'


  curl -X POST http://localhost:3000/api/v1/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Earbuds",
    "description": "Premium sound quality",
    "price": 129.99,
    "category": "Electronics",
    "stock": 100
  }'