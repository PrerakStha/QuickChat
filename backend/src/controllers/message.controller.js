import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { hasImagekitConfig } from "../lib/imagekit.js";
import { uploadChatMedia } from "../lib/imagekit.js";
import { getReceiverSocketId } from "../lib/socket.js";


export async function getUsersForSidebar(req, res) {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-clerkId");

        res.status(200).json(filteredUsers);
    }
    catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getConversationsForSidebar(req, res) {
    try {
        const loggedInUserId = req.user._id;
        const conversations = await Message.aggregate([
            {
                $match: {
                    $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }]
                }
            },
            {
                $group: {
                    _id: { $cond: [{ $eq: ["$senderId", loggedInUserId] }, "$receiverId", "$senderId"] }, lastMessageAt: { $max: "$createdAt" }
                }
            },
            {
                $sort: { lastMessageAt: -1 }
            },
            {
                $lookup: {
                    from: "users", localField: "_id", foreignField: "_id", as: "user"
                }
            },
            { $replaceRoot: { newRoot: { $first: "$user" } } },
            { $project: { clerkId: 0 } },
        ]);

        res.status(200).json(conversations);
    }
    catch (error) {
        console.error("Error fetching conversations for sidebar:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getMessages(req, res) {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function sendMessage(req, res) {
    try {
        const { text } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl = null;
        let videoUrl = null;

        if (req.file) {
            if (!hasImagekitConfig()) {
                return res.status(500).json({ error: "ImageKit configuration is missing." });
            }
            const url = await uploadChatMedia(req.file)
            if (req.file.mimetype.startsWith("video/")) { videoUrl = url; }
            else { imageUrl = url; }
        }
        const newMessage = new Message({ senderId, receiverId, text, image: imageUrl, video: videoUrl });

        await newMessage.save();

        const receiverSocketId = getReciverSocketIdByUserId(receiverId);
        // Emit the new message to the receiver if they are connected
        if (receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}