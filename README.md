Fullstack Authentication System

A secure full-stack user authentication system built with C#, ASP.NET Core, ASP.NET Identity, Entity Framework Core, PostgreSQL, JWT authentication, and React.

This project was developed as part of the ArithMatrix Full Stack Development Internship — Task 1: Secure User Authentication.

Task 1 Requirements

The application implements:

User registration
User login
Secure password hashing
JWT token-based authentication
Protected authenticated endpoint
Input validation
Appropriate HTTP status codes
React frontend authentication flow
Login and logout functionality
Technologies Used
Backend
C#
ASP.NET Core
ASP.NET Identity
Entity Framework Core
PostgreSQL
JWT Bearer Authentication
REST API
.NET 10
Frontend
React
JavaScript
Vite
Axios
HTML5
CSS3
Project Structure
ArithMatrix/
│
├── FullstackAuth.API/
│   ├── Controllers/
│   ├── DTOs/
│   ├── Data/
│   ├── Models/
│   ├── Migrations/
│   ├── Services/
│   ├── Program.cs
│   └── appsettings.json
│
├── FullstackAuth.Client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
Authentication Features
1. User Registration

Endpoint:

POST /api/Auth/register

Example request:

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}

The API validates the submitted information and uses ASP.NET Identity to securely hash the password before storing the user.

2. User Login

Endpoint:

POST /api/Auth/login

Example request:

{
  "email": "john@example.com",
  "password": "Password123!"
}

A successful login returns a JWT token.

3. Protected Endpoint

Endpoint:

GET /api/Auth/me

The endpoint requires a valid JWT token.

Example authorization header:

Authorization: Bearer <JWT_TOKEN>

A request without a valid token is rejected with:

401 Unauthorized
Frontend Authentication Flow

The React frontend provides the following authentication flow:

Registration ↔ Login → Dashboard
                         ↓
                       Logout
                         ↓
                       Login

The JWT token received after login is stored by the frontend and sent with authenticated API requests.

Validation

The application performs validation during authentication operations.

Examples include:

Required fields
Email validation
Password requirements
Duplicate email checking
Password confirmation on registration
Invalid login credentials

Invalid requests return an appropriate 400 Bad Request response where applicable.

HTTP Status Codes

The API uses appropriate HTTP status codes, including:

Status Code	Meaning
200 OK	Request completed successfully
400 Bad Request	Invalid input or validation failure
401 Unauthorized	Authentication is required or credentials are invalid
Security

The application uses several security mechanisms:

ASP.NET Identity for user management
Secure password hashing
JWT Bearer authentication
Protected authenticated endpoints
Token-based authorization
Server-side input validation
Secrets excluded from the Git repository

Local development secrets are stored separately from the committed configuration using:

appsettings.Development.json

This file is excluded through .gitignore.

Database

The application uses PostgreSQL as its database.

Entity Framework Core is used for database access and migrations.

The database stores authentication-related information managed by ASP.NET Identity, including:

User accounts
Password hashes
User roles
Authentication-related Identity data
Running the Backend
Prerequisites

Make sure you have:

.NET 10 SDK
PostgreSQL
Git
Start the API

Navigate to the backend directory:

cd FullstackAuth.API

Run:

dotnet restore
dotnet run

The API will run locally using the configured ASP.NET Core development settings.

Running the Frontend

Navigate to the frontend directory:

cd FullstackAuth.Client

Install dependencies:

npm install

Start the development server:

npm run dev

The React application will be available through the Vite development server.

Example Authentication Flow
A user opens the React application.
The user creates an account through the registration page.
The backend validates the registration data.
ASP.NET Identity securely hashes and stores the password.
The user logs in.
The API verifies the credentials.
The API generates a JWT token.
The frontend stores the authentication token.
The token is sent with protected API requests.
The authenticated user can access the dashboard.
The user can log out and the authentication token is removed.
Task 1 Deliverables

This repository contains the implementation for:

Secure user registration
Secure user login
Password hashing
JWT authentication
Protected authenticated endpoint
Input validation
Appropriate HTTP status codes
React authentication interface
Login and logout functionality
PostgreSQL persistence
Author

Patrick Mueti Isaac

BSc Information Technology
Kirinyaga University