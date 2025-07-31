import express from "express";
import upload from "../middlewares/cloudinaryUpload.js";

import {
    registerUser,
    loginUser,
    getCurrentUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { updateAvatar } from "../controllers/userController.js";

const router = express.Router();

router.patch("/avatar", upload.single("avatar"), updateAvatar);
router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getCurrentUser);

export default router;
