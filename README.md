# Internship and Career Development Hub

A full-stack MERN web application that helps students manage internships, skills, projects, certificates, career roadmaps, and job applications through a secure and user-friendly platform.

## Features

### Student

* User Registration and Login (JWT Authentication)
* Profile Management
* Skills Management (CRUD)
* Projects Management (CRUD)
* Certificates Management (CRUD)
* Internship Listings
* Career Roadmap
* Internship Applications
* Dashboard

### Admin

* Manage Users
* Manage Internships
* Manage Applications
* Verify Certificates
* Admin Dashboard

## Tech Stack

### Frontend

* React.js
* React Router
* Bootstrap
* Axios
* Vite

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Bcrypt

## Folder Structure

```
internship.and.career.development.hub
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── routes
│   ├── controllers
│   ├── models
│   ├── middleware
│   ├── config
│   ├── server.js
│   └── package.json
```

## Installation

### Clone the repository

```bash
git clone https://github.com/abhiram-t76/internship.and.career.development.hub.git
```

### Install Backend

```bash
cd backend
npm install
```

### Install Frontend

```bash
cd ../frontend
npm install
```

## Environment Variables

Create a `.env` file inside the backend folder.

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Create a `.env` file inside the frontend folder.

```
VITE_API_URL=http://localhost:5000
```

## Run the Project

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

## Live Demo

Frontend:
https://internship-and-career-development-h.vercel.app/

Backend API:
https://internship-and-career-development-hub.onrender.com

## GitHub Repository

https://github.com/abhiram-t76/internship.and.career.development.hub

## Author

**Abhiram T**

B.Tech Computer Science Engineering (Data Science)

GitHub:
https://github.com/abhiram-t76
