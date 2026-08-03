// import cors from "cors";
// import "dotenv/config";
// import express from "express";
// import mongoose from "mongoose";
// import chatRoutes from "./routes/chat.js";
// import morgan from "morgan";

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(morgan("dev")); // It is inbuild express middleware

// app.get("/server", (req, res) => {
//   res.send("Server is working");
// });

// app.get("/db-test", async (req, res) => {
//   try {
//     res.json({
//       readyState: mongoose.connection.readyState,
//       host: mongoose.connection.host,
//       db: mongoose.connection.name,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// app.use("/api", chatRoutes);

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);

//     console.log("✅ MongoDB Connected");
//   } catch (err) {
//     console.error("❌ MongoDB Error:", err);
//   }
// };

// console.log(process.env.MONGODB_URI);

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   connectDB();
// });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import "dotenv/config";

import chatRoutes from "./routes/chat.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/server", (req, res) => {
  res.send("Server is working");
});

app.get("/db-test", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    res.json({
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      db: mongoose.connection.name,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      name: err.name,
    });
  }
});

app.use("/api", chatRoutes);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGODB_URI);

  isConnected = true;

  console.log("Mongo Connected");
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

export default app;
