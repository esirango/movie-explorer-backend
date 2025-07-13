import express from "express";
import upload from "../middlewares/upload.js";
import {
    registerUser,
    loginUser,
    getCurrentUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getCurrentUser);

export default router;
