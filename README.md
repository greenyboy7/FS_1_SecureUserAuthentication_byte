# FullstackAuth.API

A full-stack authentication and employee management API built with ASP.NET Core, C#, Entity Framework Core, PostgreSQL, ASP.NET Identity, and JWT authentication.

The project provides secure user registration and login, role-based authorization, and employee management CRUD operations.

# Features

- User registration
- Secure password hashing using ASP.NET Identity
- User login
- JWT authentication
- Protected authenticated endpoint
- Role-based authorization
- Admin role management
- Employee CRUD operations
- PostgreSQL database
- Entity Framework Core migrations
- Input validation
- Proper HTTP status codes

## Technologies Used

- C#
- ASP.NET Core
- ASP.NET Identity
- JWT (JSON Web Token)
- Entity Framework Core
- PostgreSQL
- REST API
- .NET 10

## Authentication & Authorization

The API uses ASP.NET Identity for user management and password hashing.

Authentication is handled using JWT bearer tokens.

### Authentication Flow

1. A user registers using the `/api/Auth/register` endpoint.
2. ASP.NET Identity securely hashes and stores the password.
3. The user logs in using `/api/Auth/login`.
4. The API verifies the user's credentials.
5. A JWT token is generated and returned.
6. The client sends the token using the `Authorization: Bearer <token>` header.
7. Protected endpoints validate the JWT before allowing access.

### Roles

The API supports role-based authorization.

- **Admin** — can create, update, and delete employees.
- **Normal User** — can authenticate and access protected resources but cannot perform Admin-only employee operations.

## API Endpoints

### Authentication

| Method | Endpoint | Description | Authentication |

| POST | `/api/Auth/register` | Register a new user | Public |
| POST | `/api/Auth/login` | Login and receive JWT token | Public |
| GET | `/api/Auth/me` | Get authenticated user information | JWT required |

### Employee Management

| Method | Endpoint | Description | Access |

| GET | `/api/Employee` | Get all employees | Authenticated |
| GET | `/api/Employee/{id}` | Get employee by ID | Authenticated |
| POST | `/api/Employee` | Create employee | Admin |
| PUT | `/api/Employee/{id}` | Update employee | Admin |
| DELETE | `/api/Employee/{id}` | Delete employee | Admin |

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- .NET 10 SDK
- PostgreSQL
- Git

### Clone the Repository

```bash
git clone <your-github-repository-url>
cd FullstackAuth.API

## Testing

The API was tested using the following authentication and authorization scenarios:

### Registration

A new user can register through:

`POST /api/Auth/register`

The API validates the submitted data and securely hashes the password using ASP.NET Identity.

### Login

A registered user can log in through:

`POST /api/Auth/login`

Successful login returns a JWT token.

### Protected Endpoint

The `/api/Auth/me` endpoint requires a valid JWT token.

Requests without a valid token return:

`401 Unauthorized`

### Role-Based Authorization

Admin users can:

- Create employees
- Update employees
- Delete employees

Normal users cannot perform these Admin-only operations.

Unauthorized Admin operations return:

`403 Forbidden`

### Employee Validation

Employee data is validated before being stored in the database.

Invalid data returns:

`400 Bad Request`

## Database

The application uses PostgreSQL with Entity Framework Core.

The database stores:

- User accounts and authentication data
- User roles
- Employee records

Entity Framework Core migrations are used to create and update the database schema.

To apply the latest migrations:

```bash
dotnet ef database update

## Project Structure

```text
FullstackAuth.API/
│
├── Controllers/
│   ├── AuthController.cs
│   └── EmployeeController.cs
│
├── Data/
│   └── AppDbContext.cs
│
├── DTOs/
│   ├── LoginRequest.cs
│   └── RegisterRequest.cs
│
├── Models/
│   ├── User.cs
│   └── Employee.cs
│
├── Migrations/
│
├── Program.cs
├── appsettings.json
└── README.md
