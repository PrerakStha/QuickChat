import express from "express";
import User from "../models/user.model.js";
import { verifyWebhook } from "@clerk/clerk-sdk-node";
import clerkWebhook from "./webhooks/clerk.webhook.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
        if (!signingSecret) {
            return res.status(500).json({ error: "CLERK_WEBHOOK_SIGNING_SECRET is not defined in the environment variables" });
        }

        const payload = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : String(req.body);
        const request = new Request("http://internal/webhooks/clerk", {
            method: "POST",
            headers: new Headers(req.headers),
            body: payload,
        });

        const evt = await verifyWebhook(request, { signingSecret });
        if (evt.type === "user.created" || evt.type === "user.updated") {
            const u = evt.data;

            const email =
                u.email_addresses?.find((e) => e.id === u.primary_email_address_id)?.email_address || null;
            u.email_addresses?.[0]?.email_address || 
            null;

            const fullName =
                [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username || email?.split("@")[0] || "Unknown User";

            await User.findOneAndUpdate({ clerkId: u.id },
                { clerkId: u.id, email, fullName, profilePic: u.image_url },
                { upsert: true, new: true, setDefaultsOnInsert: true },
            );
        }
        if (evt.type === "user.deleted") {
            if (evt.data.id) await User.findOneAndDelete({ clerkId: evt.data.id });
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error("Error processing Clerk webhook:", error);
        res.status(400).json({ error: "Invalid webhook payload or signature" });
    }
});

export default router;