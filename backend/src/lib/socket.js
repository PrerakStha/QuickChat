import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: [
      FRONTEND_URL,
      "http://localhost:5173",
      "https://quickchat-frontend.vercel.app",
    ],
    credentials: true,
  },
});

const userSocketMap = {};

function getReceiverSocketId(receiverId) {
  return userSocketMap[receiverId] || null;
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    // Only remove the entry if it still belongs to this socket
    if (userId && userSocketMap[userId] === socket.id) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, userSocketMap, server, app, getReceiverSocketId };