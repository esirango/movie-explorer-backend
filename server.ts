import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import favoriteRoutes from "./routes/favorites";

import { authMiddleware } from "./middlewares/auth";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/favorites", authMiddleware, favoriteRoutes);
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is not defined!");
}

mongoose
    .connect(mongoUri)
    .then(() =>
        app.listen(process.env.PORT || 4000, () =>
            console.log("✅ Server running")
        )
    )
    .catch((err) => console.log("❌ DB Error:", err));
