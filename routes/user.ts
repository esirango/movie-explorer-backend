import express from "express";
import upload from "../middlewares/cloudinaryUpload";
import {
    updateAvatar,
    updatePassword,
    updateUsername,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.patch("/avatar", authMiddleware, upload.single("avatar"), updateAvatar);

router.patch("/username", authMiddleware, updateUsername);

router.patch("/password", authMiddleware, updatePassword);

export default router;
