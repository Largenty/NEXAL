import mongoose from "mongoose";
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

declare global {
    var mongooseCache: {
        conn: null | typeof mongoose;
        promise: null | Promise<typeof mongoose>;
    };
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToMongoDB = async () => {
    if (!MONGO_URI) throw new Error("MONGO_URI must be set within .env");

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI, { bufferCommands: false });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    console.log(`Connected to MongoDB ${process.env.NODE_ENV} - ${MONGO_URI}`);
    return cached.conn;
};
