import express from "express";
import upload from "../middlewares/cloudinaryUpload.js";
import { updateAvatar } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.patch("/avatar", authMiddleware, upload.single("avatar"), updateAvatar);

export default router;
