# 💬 QuickChat

> A modern, secure, and lightning-fast full-stack real-time chat application built with React, Node.js, and Socket.IO. Chat seamlessly with friends and family in private sessions with real-time updates, custom themes, media sharing, and robust security.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=render)](https://quickchat-36eo.onrender.com/)

---

## ✨ Key Features

* **Real-Time Messaging:** Instant, low-latency messaging powered by **Socket.IO**.
* **Secure Authentication:** User management and session synchronization handled via **Clerk** (`@clerk/express` & `@clerk/react`) and webhooks.
* **Media & File Sharing:** Seamless image and file uploads backed by **ImageKit**.
* **State Management:** High-performance, predictable client-side state handled with **Zustand**.
* **Modern UI & Routing:** Styled with **Tailwind CSS v4** and **HeroUI** components (`@heroui/react`), complete with custom themes and dark mode support.
* **Database Persistence:** Robust user data and chat history stored securely via **MongoDB Atlas & Mongoose**.
* **Containerized Environment:** Easily build and deploy services using **Docker**.

---

## 🛠️ Tech Stack

### **Frontend**
* **React 19** & **Vite**
* **Tailwind CSS v4** & **HeroUI**
* **Zustand** (Global State Management)
* **React Router** (Client-side navigation)
* **Socket.IO Client** (Real-time connection)
* **Axios** & **React Hot Toast** (API requests & UI notifications)

### **Backend**
* **Node.js** & **Express.js v5**
* **Socket.IO** (WebSockets engine)
* **MongoDB Atlas** & **Mongoose** (Database & ODM)
* **Clerk SDK & Webhooks** (Authentication & sync middleware)
* **ImageKit & Multer** (File upload pipeline)
* **Cron** (Scheduled background maintenance tasks)

---

## 📁 Project Structure

```text
QuickChat/
├── backend/
│   ├── dist/              # Compiled build output
│   ├── src/
│   │   ├── controllers/   # Route logic handlers
│   │   ├── lib/           # Utility files & external service clients
│   │   ├── middleware/    # Custom Express middlewares
│   │   ├── models/        # Mongoose database schemas
│   │   ├── routes/        # Express API routers
│   │   ├── seeds/         # Database seeding scripts
│   │   ├── webhooks/      # Clerk event webhooks
│   │   └── index.js       # Server entry point & Socket.IO setup
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── public/            # Static assets
│   ├── src/               # React components, pages, state stores
│   ├── vite.config.js     # Vite configuration
│   └── package.json
├── .dockerignore
└── README.md

🚀 Getting Started
Follow these instructions to set up and run QuickChat locally on your machine.
Prerequisites
Ensure you have the following installed:
Node.js (v18+ recommended)
Docker (Optional, for containerized execution)   
PNG
A MongoDB Atlas cluster account
A Clerk account for keys and webhooks
An ImageKit account for media hosting
1. Clone the Repository
Bash
git clone [https://github.com/your-username/quick-chat.git](https://github.com/your-username/quick-chat.git)
cd QuickChat
2. Environment Variables Setup
Create a .env file inside your backend/ directory with the following configuration:
Code snippet
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
3. Installation & Local Execution
Run the Backend Server
Bash
cd backend
npm install

# Optional: Seed initial test users into the database
npm run db:seed

# Start development server with watch mode
npm run dev
Run the Frontend Application
Open a separate terminal window, navigate to the frontend folder, install dependencies, and launch Vite:
Bash
cd frontend
npm install
npm run dev
🐳 Running via Docker
To build and run the backend inside a Docker container:
Bash
cd backend
docker build -t quickchat-backend .
docker run -p 5000:5000 --env-file .env quickchat-backend
📄 Scripts Reference
Backend (package.json)
npm start: Runs the production server (node src/index.js)[cite: 3]
npm run dev: Starts the server with live watch mode (node --watch src/index.js)[cite: 3]
npm run build: Cleans dist and bundles files using rimraf and copyfiles
npm run db:seed: Seeds sample user documents into MongoDB Atlas[cite: 3]
Frontend (package.json)
npm run dev: Starts the Vite development server[cite: 4]
npm run build: Bundles the React application for production[cite: 4]
npm run lint: Checks code quality using oxlint
