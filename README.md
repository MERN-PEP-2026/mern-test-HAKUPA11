# MERN Task Management System

A full-stack Task Management application built with MongoDB, Express, React, and Node.js.

## Student Details
- **Name:** Harsh Kumar Pandit, 12315495
- **Repository:** mern-test-HAKUPA11

## Project Structure
```
mern-test-HAKUPA11/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── components/
    │   │   ├── TaskCard.jsx
    │   │   └── EditTaskModal.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Features

- ✅ User Registration and Login
- ✅ JWT Authentication
- ✅ Create Tasks
- ✅ View All Tasks
- ✅ Update Task Status
- ✅ Delete Tasks
- ✅ Filter Tasks by Status
- ✅ Edit Tasks
- ✅ Logout Functionality
- ✅ Protected API Routes
- ✅ Responsive UI

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/tasks | Get all tasks | Yes |
| POST | /api/tasks | Create task | Yes |
| PUT | /api/tasks/:id | Update task | Yes |
| DELETE | /api/tasks/:id | Delete task | Yes |

## Tech Stack

- **Frontend:** React, Vite, Axios, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend folder:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
```