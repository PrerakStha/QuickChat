# 💬 QuickChat

> A modern, secure, and lightning-fast full-stack real-time chat application built with React, Node.js, and Socket.IO. Chat seamlessly with friends and family in private sessions with real-time updates, custom themes, media sharing, and robust security.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=render)](https://quickchat-36eo.onrender.com/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

---

## ✨ Key Features

* **Real-Time Messaging:** Instant, low-latency messaging powered by **Socket.IO**[cite: 3, 4].
* **Secure Authentication:** User management and session synchronization handled via **Clerk** (`@clerk/express` & `@clerk/react`) and webhooks.
* **Media & File Sharing:** Seamless image and file uploads backed by **ImageKit**.
* **State Management:** High-performance, predictable client-side state handled with **Zustand**.
* **Modern UI & Routing:** Styled with **Tailwind CSS v4** and **HeroUI** components (`@heroui/react`), complete with custom themes and dark mode support.
* **Database Persistence:** Robust user data and chat history stored securely via **MongoDB Atlas & Mongoose**.
* **Containerized Environment:** Easily build and deploy services using **Docker**.

---

## 🛠️ Tech Stack

### **Frontend**
* **React 19** & **Vite**[cite: 4]
* **Tailwind CSS v4** & **HeroUI**[cite: 4]
* **Zustand** (Global State Management)[cite: 4]
* **React Router** (Client-side navigation)[cite: 4]
* **Socket.IO Client** (Real-time connection)[cite: 4]
* **Axios** & **React Hot Toast** (API requests & UI notifications)[cite: 4]

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
