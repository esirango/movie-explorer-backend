import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import movieRoutes from "./routes/movies.js";
import { authMiddleware } from "./middlewares/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/movies", authMiddleware, movieRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() =>
        app.listen(process.env.PORT || 4000, () =>
            console.log("✅ Server running")
        )
    )
    .catch((err) => console.log("❌ DB Error:", err));
