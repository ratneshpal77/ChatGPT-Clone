import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import morgan from "morgan";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // It is inbuild express middleware

app.use("/api", chatRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
