import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chatgpt-clone-3-4c0n.onrender.com",
    ],
  }),
);
app.use(morgan("dev")); // It is inbuild express middleware

app.get("/server", (req, res) => {
  res.send("Server is working");
});

app.use("/api", chatRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!");
  } catch (err) {
    console.log("Failed to connect with Db", err);
  }
};

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
