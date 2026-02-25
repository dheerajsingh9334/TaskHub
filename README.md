# TaskHub

> Secure, scalable full-stack Task Management Application with JWT authentication, AES payload encryption, protected dashboard, and CRUD engine built using React and Node.js.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   Client (React + Vite)                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │
│  │  Pages   │  │ Features │  │   Context (Auth)      │  │
│  │Dashboard │  │ Auth     │  │   - JWT stored in     │  │
│  │ Profile  │  │ Tasks    │  │     HTTP-only cookie   │  │
│  └──────────┘  └──────────┘  └───────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Axios Instance (withCredentials, 401 interceptor) │  │
│  └────────────────────────┬─────────────────────────┘   │
└───────────────────────────┼─────────────────────────────┘
                            │  HTTP (cookies auto-sent)
┌───────────────────────────┼─────────────────────────────┐
│                   Server (Express.js)                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Middleware: Helmet, CORS, Rate-Limit, Validators │    │
│  └──────────────────────┬──────────────────────────┘    │
│  ┌──────────┐  ┌────────┴──────┐  ┌────────────────┐   │
│  │ Routes   │→ │ Controllers   │→ │  Services      │   │
│  │ (auth,   │  │ (validation,  │  │  (business     │   │
│  │  tasks)  │  │  response)    │  │   logic)       │   │
│  └──────────┘  └───────────────┘  └───────┬────────┘   │
│  ┌──────────────┐  ┌──────────┐      ┌────┴───────┐   │
│  │ JWT Auth     │  │  AES     │      │  MongoDB   │   │
│  │ Middleware   │  │ Encrypt  │      │  (Mongoose)│   │
│  └──────────────┘  └──────────┘      └────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Design Patterns:**

- **Service Layer Pattern** — Business logic separated from controllers
- **Middleware Chain** — Authentication, validation, error handling as composable layers
- **Centralized Error Handling** — Custom `AppError` class with operational error distinction
- **Environment Configuration** — Validated config module (`config/env.js`) with required variable checks

---

## Tech Stack

| Layer            | Technology                                                       |
| ---------------- | ---------------------------------------------------------------- |
| **Frontend**     | React 18 with Vite, TailwindCSS, Axios, React Hook Form          |
| **Backend**      | Node.js, Express.js, MongoDB with Mongoose                       |
| **Auth**         | JWT (HTTP-only cookies), bcrypt Password Hashing                 |
| **Security**     | AES-256-GCM encryption, Helmet, Rate Limiting, express-validator |
| **Architecture** | Modular service layer, REST API, Centralized error handling      |

---

## Features

### Authentication

- User Registration with hashed password (bcrypt, 12 salt rounds)
- Secure Login using JWT stored in HTTP-only cookies with Secure + SameSite flags
- Protected Routes on both frontend and backend
- Logout with cookie expiration (no auth required)
- Auto session validation on app load

### Task Management

- Full CRUD operations (Create, Read, Update, Delete)
- Search tasks by title/description (debounced, regex)
- Filter by status and priority
- Server-side pagination
- Real-time stats dashboard via dedicated stats API

### Security

- **HTTP-only cookies** with Secure and SameSite flags
- **AES-256-GCM encryption** on sensitive response fields (e.g., email)
- **Input validation & sanitization** via express-validator on all routes
- **Password hashing** with bcrypt (12 salt rounds)
- **Rate limiting** — 100 requests per 15-minute window
- **Helmet** security headers
- **CORS** restricted to allowed origins
- **No hardcoded secrets** — all sensitive values via environment variables
- Centralized error handling prevents stack trace leakage in production

### Scalability

- Modular backend with service layer separation
- Config-based environment setup with validation
- Indexed MongoDB queries (text index + compound index)
- Structured logging utility (JSON format, level-based)

---

## Folder Structure

```
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── LoadingSkeleton.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Global auth state
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   └── tasks/
│   │   │       ├── TaskCard.jsx
│   │   │       └── TaskModal.jsx
│   │   ├── hooks/
│   │   │   └── useDebounce.js        # Custom hooks
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Profile.jsx
│   │   ├── services/
│   │   │   └── api.js                # Axios instance + interceptors
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 # MongoDB connection
│   │   │   └── env.js                # Environment config with validation
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   ├── auth.js               # JWT verification middleware
│   │   │   ├── errorHandler.js       # Centralized error handler
│   │   │   └── validators.js         # express-validator rules
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── services/
│   │   │   ├── authService.js        # Auth business logic
│   │   │   └── taskService.js        # Task business logic
│   │   ├── utils/
│   │   │   ├── AppError.js           # Custom error class
│   │   │   ├── jwt.js                # Token utilities
│   │   │   ├── encryption.js         # AES-256-GCM encryption
│   │   │   └── logger.js             # Structured logging
│   │   └── index.js                  # App entry point
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## API Endpoints

### Auth Routes

| Method | Endpoint                | Description         | Auth |
| ------ | ----------------------- | ------------------- | ---- |
| `POST` | `/api/v1/auth/register` | Register new user   | No   |
| `POST` | `/api/v1/auth/login`    | Login user          | No   |
| `POST` | `/api/v1/auth/logout`   | Logout user         | No   |
| `GET`  | `/api/v1/auth/profile`  | Get user profile    | Yes  |
| `PUT`  | `/api/v1/auth/profile`  | Update user profile | Yes  |

### Task Routes

| Method   | Endpoint                      | Description                  | Auth |
| -------- | ----------------------------- | ---------------------------- | ---- |
| `POST`   | `/api/v1/tasks`               | Create new task              | Yes  |
| `GET`    | `/api/v1/tasks`               | Get all tasks (with filters) | Yes  |
| `GET`    | `/api/v1/tasks/stats`         | Get task status counts       | Yes  |
| `PUT`    | `/api/v1/tasks/:id`           | Update task                  | Yes  |
| `DELETE` | `/api/v1/tasks/:id`           | Delete task                  | Yes  |
| `GET`    | `/api/v1/tasks/search?query=` | Search tasks                 | Yes  |

**Query Parameters for GET /tasks:**

- `status` — filter by status (pending, in-progress, completed)
- `priority` — filter by priority (low, medium, high)
- `page` — pagination page number (default: 1)
- `limit` — items per page (default: 10)

---

## Sample API Request / Response

### Register

**Request:**

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "Dheeraj Singh",
  "email": "dheeraj@example.com",
  "password": "securePassword123"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Dheeraj Singh",
      "email": "a1b2c3...encrypted..."
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Login

**Request:**

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "dheeraj@example.com",
  "password": "securePassword123"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Dheeraj Singh",
      "email": "a1b2c3...encrypted..."
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Create Task

**Request:**

```http
POST /api/v1/tasks
Content-Type: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIs...

{
  "title": "Complete assessment",
  "description": "Finish the full-stack task management app",
  "status": "in-progress",
  "priority": "high"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "_id": "65f1b2c3d4e5f6a7b8c9d0e1",
    "title": "Complete assessment",
    "description": "Finish the full-stack task management app",
    "status": "in-progress",
    "priority": "high",
    "user": "65f1a2b3c4d5e6f7a8b9c0d1",
    "createdAt": "2026-02-25T10:30:00.000Z",
    "updatedAt": "2026-02-25T10:30:00.000Z"
  }
}
```

### Get Tasks (Paginated + Filtered)

**Request:**

```http
GET /api/v1/tasks?status=pending&priority=high&page=1&limit=6
Cookie: token=eyJhbGciOiJIUzI1NiIs...
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "_id": "65f1b2c3d4e5f6a7b8c9d0e1",
        "title": "Complete assessment",
        "description": "Finish the full-stack task management app",
        "status": "pending",
        "priority": "high",
        "user": "65f1a2b3c4d5e6f7a8b9c0d1",
        "createdAt": "2026-02-25T10:30:00.000Z",
        "updatedAt": "2026-02-25T10:30:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "pages": 1
    }
  }
}
```

### Get Task Stats

**Request:**

```http
GET /api/v1/tasks/stats
Cookie: token=eyJhbGciOiJIUzI1NiIs...
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "total": 12,
    "pending": 5,
    "inProgress": 4,
    "completed": 3
  }
}
```

### Update Task

**Request:**

```http
PUT /api/v1/tasks/65f1b2c3d4e5f6a7b8c9d0e1
Content-Type: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIs...

{
  "status": "completed"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "65f1b2c3d4e5f6a7b8c9d0e1",
    "title": "Complete assessment",
    "description": "Finish the full-stack task management app",
    "status": "completed",
    "priority": "high",
    "user": "65f1a2b3c4d5e6f7a8b9c0d1",
    "createdAt": "2026-02-25T10:30:00.000Z",
    "updatedAt": "2026-02-25T12:00:00.000Z"
  }
}
```

### Delete Task

**Request:**

```http
DELETE /api/v1/tasks/65f1b2c3d4e5f6a7b8c9d0e1
Cookie: token=eyJhbGciOiJIUzI1NiIs...
```

**Response (200):**

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Search Tasks

**Request:**

```http
GET /api/v1/tasks/search?query=assessment
Cookie: token=eyJhbGciOiJIUzI1NiIs...
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "65f1b2c3d4e5f6a7b8c9d0e1",
      "title": "Complete assessment",
      "description": "Finish the full-stack task management app",
      "status": "in-progress",
      "priority": "high",
      "user": "65f1a2b3c4d5e6f7a8b9c0d1",
      "createdAt": "2026-02-25T10:30:00.000Z",
      "updatedAt": "2026-02-25T10:30:00.000Z"
    }
  ]
}
```

### Error Response Example

**Response (400):**

```json
{
  "success": false,
  "message": "Task title is required, Priority must be low, medium, or high"
}
```

**Response (401):**

```json
{
  "success": false,
  "message": "Not authorized, no token provided"
}
```

---

## Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taskhub
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
ENCRYPTION_KEY=your_aes_encryption_key_change_in_production
```

| Variable         | Description                                     | Required |
| ---------------- | ----------------------------------------------- | -------- |
| `PORT`           | Server port (default: 5000)                     | No       |
| `NODE_ENV`       | Environment mode (development/production)       | No       |
| `MONGO_URI`      | MongoDB connection string                       | Yes      |
| `JWT_SECRET`     | Secret key for JWT signing                      | Yes      |
| `JWT_EXPIRE`     | JWT expiration time (default: 7d)               | No       |
| `CLIENT_URL`     | Frontend URL for CORS                           | No       |
| `ENCRYPTION_KEY` | Key for AES encryption (defaults to JWT_SECRET) | No       |

---

## How to Run

### Prerequisites

- Node.js v18+
- MongoDB running locally or MongoDB Atlas URI

### Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd TaskHub

# 2. Install server dependencies
cd server
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and secrets

# 4. Install client dependencies
cd ../client
npm install

# 5. Start the backend (from server/)
cd ../server
npm run dev

# 6. Start the frontend (from client/)
cd ../client
npm run dev

# 7. Open browser
# Navigate to http://localhost:5173
```

---

## Security Implementation Details

| Security Measure           | Implementation                                       |
| -------------------------- | ---------------------------------------------------- |
| Password Hashing           | bcrypt with 12 salt rounds                           |
| Token Storage              | HTTP-only cookie with Secure + SameSite flags        |
| Payload Encryption         | AES-256-GCM on sensitive response fields (email)     |
| Input Validation           | express-validator with sanitization on all endpoints |
| Rate Limiting              | 100 requests / 15 min per IP                         |
| Security Headers           | Helmet.js (CSP, XSS, HSTS, etc.)                     |
| CORS                       | Restricted to CLIENT_URL origin only                 |
| Error Handling             | No stack traces in production                        |
| Env Variables              | Validated at startup, never hardcoded                |
| NoSQL Injection Prevention | Mongoose schema validation + express-validator       |

---

## Author

**Dheeraj Singh**
