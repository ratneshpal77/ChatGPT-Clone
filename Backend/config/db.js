
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

console.log(process.env.MONGO_URI);

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return mongoose.connection;
  }

  console.log(process.env.MONGO_URI);

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);

    console.log(process.env.MONGO_URI);

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
      isConnected = false;
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB error:", err);
      isConnected = false;
    });

    return conn.connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;