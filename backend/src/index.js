import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import cors from "cors";

import "dotenv/config";
import fs from "fs";
import path from "path";

import { clerkMiddleware } from '@clerk/express'

import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001";

console.log(process.env.MONGO_URI);

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});


if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir))
    app.get("/{*any}",(req,res,next)=>{
        res.sendFile(path.join(publicDir, "index.html"),(err)=>next(err));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port", PORT);
});