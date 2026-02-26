# ScholarHub - Scholarship Application Portal

A full-stack **MERN** (MongoDB, Express, React, Node.js) application for managing scholarship applications with a modern UI built using Tailwind CSS.

---

## Features

- **Student Portal** — Apply for scholarships via a clean form
- **Status Tracker** — Look up applications by email with color-coded status badges
- **Admin Dashboard** — Review, approve, reject, or delete applications with filter tabs & stats
- **Modern UI/UX** — Responsive design, gradient hero, animated transitions, mobile navigation
- **RESTful API** — Clean Express routes with Mongoose validation

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 19, React Router, Tailwind CSS, Vite |
| Backend  | Node.js, Express.js               |
| Database | MongoDB, Mongoose                  |
| Icons    | React Icons (Heroicons v2)         |

---

## Project Structure

```
Scholarship_Portal/
├── server.js              # Express server & MongoDB connection
├── .env                   # Environment variables
├── package.json           # Backend dependencies
├── models/
│   └── Scholarship.js     # Mongoose schema
├── routes/
│   └── scholarshipRoutes.js  # API endpoints
└── client/                # React frontend
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── ApplicationForm.jsx
        │   ├── StudentDashboard.jsx
        │   └── AdminDashboard.jsx
        └── pages/
            ├── Home.jsx
            └── NotFound.jsx
```

---

## API Endpoints

| Method | Route                      | Description                       |
|--------|----------------------------|-----------------------------------|
| POST   | `/api/apply`               | Submit a new application          |
| GET    | `/api/status/:email`       | Get applications by student email |
| GET    | `/api/admin/applications`  | Get all applications (admin)      |
| PATCH  | `/api/admin/update/:id`    | Update application status         |
| DELETE | `/api/admin/delete/:id`    | Delete an application             |

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Janiish/Scholarship_Portal.git
cd Scholarship_Portal

# 2. Install backend dependencies
npm install

# 3. Install frontend dependencies
cd client && npm install && cd ..

# 4. Configure environment
#    Edit .env with your MongoDB URI

# 5. Run the full stack (backend + frontend)
npm run fullstack
```

- **Backend** runs on `http://localhost:5000`
- **Frontend** runs on `http://localhost:3000` (proxies API requests to backend)

### Individual Commands

```bash
npm run dev        # Start backend only (nodemon)
npm run client     # Start frontend only (Vite)
npm run fullstack  # Start both concurrently
npm run build      # Build frontend for production
```

---

## License

MIT