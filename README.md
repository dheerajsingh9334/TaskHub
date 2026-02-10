# TaskHUb

> Secure, scalable full stack web application with JWT authentication, protected dashboard, and CRUD engine built using React and Node.js.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

---

## Tech Stack

| Layer            | Technology                                              |
| ---------------- | ------------------------------------------------------- |
| **Frontend**     | React 18 with Vite, TailwindCSS, Axios, React Hook Form |
| **Backend**      | Node.js, Express.js, MongoDB with Mongoose              |
| **Auth**         | JWT Authentication, bcrypt Password Hashing             |
| **Architecture** | Modular scalable structure, REST API, Token-based auth  |

---

## Features

### Authentication

- User Registration with hashed password (bcrypt, 12 salt rounds)
- Secure Login using JWT
- Protected Routes for Dashboard
- Logout with token removal
- Auto session validation on app load

### Dashboard

- User Profile Fetch and Update
- Task CRUD operations (Create, Read, Update, Delete)
- Search and filter tasks (debounced search, status/priority filters)
- Responsive UI with dark theme

### Security

- Password hashing using bcrypt before storage
- JWT verification middleware on every protected request
- Input validation and sanitization (express-validator)
- Centralized error handling ensures safe API responses
- Rate limiting (100 requests per 15 min window)
- Helmet security headers
- Environment variables protect sensitive configuration

### Scalability Ready

- Modular backend architecture with service layer separation
- Config-based environment setup
- Indexed MongoDB queries for search performance
- Easily extensible codebase

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
│   │   │   └── env.js                # Environment config
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   ├── auth.js               # JWT verification
│   │   │   ├── errorHandler.js       # Centralized error handler
│   │   │   └── validators.js         # Input validation rules
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── services/
│   │   │   ├── authService.js        # Business logic layer
│   │   │   └── taskService.js
│   │   ├── utils/
│   │   │   ├── AppError.js           # Custom error class
│   │   │   └── jwt.js                # Token utilities
│   │   └── index.js                  # App entry point
│   ├── .env.example
│   └── package.json
│
├── postman_collection.json          # API testing collection
└── README.md
```

---

## API Endpoints

### Auth

| Method | Endpoint                | Description         | Auth |
| ------ | ----------------------- | ------------------- | ---- |
| `POST` | `/api/v1/auth/register` | Register new user   | No   |
| `POST` | `/api/v1/auth/login`    | Login user          | No   |
| `GET`  | `/api/v1/auth/profile`  | Get user profile    | Yes  |
| `PUT`  | `/api/v1/auth/profile`  | Update user profile | Yes  |

### Tasks

| Method   | Endpoint                      | Description                  | Auth |
| -------- | ----------------------------- | ---------------------------- | ---- |
| `POST`   | `/api/v1/tasks`               | Create new task              | Yes  |
| `GET`    | `/api/v1/tasks`               | Get all tasks (with filters) | Yes  |
| `PUT`    | `/api/v1/tasks/:id`           | Update task                  | Yes  |
| `DELETE` | `/api/v1/tasks/:id`           | Delete task                  | Yes  |
| `GET`    | `/api/v1/tasks/search?query=` | Search tasks                 | Yes  |

**Query Parameters for GET /tasks:**

- `status` — filter by status (pending, in-progress, completed)
- `priority` — filter by priority (low, medium, high)
- `page` — pagination page number
- `limit` — items per page

---

## Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth-dashboard
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

---

## How to Run

### Prerequisites

- Node.js v18+
- MongoDB running locally or MongoDB Atlas URI

### Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd auth-dashboard

# 2. Install server dependencies
cd server
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

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

## Author

**Dheeraj Singh**
