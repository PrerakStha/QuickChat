import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getConversationsForSidebar, getMessages } from "../controllers/message.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/conversations", protectRoute, getConversationsForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send", protectRoute, upload.single("media") , sendMessage);


export default router;