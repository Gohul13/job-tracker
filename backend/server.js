import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import applicationRoutes from "./routes/applicationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use("/api/applications", applicationRoutes);
app.use("/api/auth",authRoutes);
app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} 😎`)
})

