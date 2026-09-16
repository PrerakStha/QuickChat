import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import cors from "cors";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { clerkMiddleware } from "@clerk/express";

import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001";
const publicDir = path.join(process.cwd(), "public");

// Middlewares
app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Serve Static Frontend or Fallback API Route
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
app.get("/*splat", (req, res, next) => {
  res.sendFile(path.join(publicDir, "index.html"), (err) => {
    if (err) next(err);
  });
});
} else {
  app.get("/", (req, res) => {
    res.send("QuickChat API is running standard operations.");
  });
}

// Start Server (Must be at the very bottom)
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port", PORT);
});