import { getAuth, clerkClient } from "@clerk/express";
import User from "../models/user.model.js";

export async function protectRoute(req, res, next) {
    try {
        const { userId } = getAuth(req);
        console.log("clerk userId:", userId);

        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        let user = await User.findOne({ clerkId: userId });
        console.log("db user found:", !!user);

        // Fallback: create/link the user if the Clerk webhook never ran (e.g. on localhost)
        if (!user) {
            const clerkUser = await clerkClient.users.getUser(userId);

            const email = clerkUser.emailAddresses[0]?.emailAddress;
            const fullName =
                `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
                clerkUser.username ||
                email?.split("@")[0] ||
                "User";

            // If a user with this email already exists, link it to this Clerk ID
            user = await User.findOneAndUpdate(
                { email },
                {
                    $set: { clerkId: userId },
                    $setOnInsert: { fullName, profilePic: clerkUser.imageUrl ?? "" },
                },
                { new: true, upsert: true, runValidators: true },
            );
            console.log("db user created/linked:", user._id);
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}