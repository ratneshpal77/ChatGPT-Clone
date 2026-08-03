import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // It is inbuild express middleware

app.get("/server", (req, res) => {
  res.send("Server is working");
});

app.use("/api", chatRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
  }
};

console.log(process.env.MONGODB_URI);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
