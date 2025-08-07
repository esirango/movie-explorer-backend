import express from "express";
import upload from "../middlewares/cloudinaryUpload";

import {
    registerUser,
    loginUser,
    getCurrentUser,
} from "../controllers/authController";
import { authMiddleware } from "../middlewares/auth";
import { updateAvatar } from "../controllers/userController";

const router = express.Router();

router.patch("/avatar", upload.single("avatar"), updateAvatar);
router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getCurrentUser);

export default router;
