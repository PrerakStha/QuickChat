import mongoose from 'mongoose';
import dns from "node:dns";

// Force Node.js to use Google's public DNS servers for SRV resolution
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export async function connectDB() {
    try {
        const mongoURI = process.env.MONGO_URI

        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in the environment variables');
        }
        const conn = await mongoose.connect(mongoURI);
        console.log('MongoDB connected:', conn.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}