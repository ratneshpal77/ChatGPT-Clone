// import cors from "cors";
// import "dotenv/config";
// import express from "express";
// import mongoose from "mongoose";
// import chatRoutes from "./routes/chat.js";


// const app = express();
// const PORT = 8080;

// app.use(express.json());
// app.use(cors());

// app.use("/api", chatRoutes);



// app.listen(PORT, () => {
//   console.log(`server running on ${PORT}`);
//   connectDB();
// });

// const connectDB = async() => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("Connected with Database!");
//     } catch(err) {
//         console.log("Failed to connect with Db", err);
//     }
// }






















import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",   // abhi sab allow
}));

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



