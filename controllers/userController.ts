import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

interface AuthRequest extends Request {
    userId?: string;
    file?: Express.Multer.File;
}

export const updateAvatar = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        let avatarUrl: string | undefined;

        if (req.file) {
            avatarUrl = req.file.path;
        } else if (req.body.url) {
            avatarUrl = req.body.url;
        } else {
            return res.status(400).json({ msg: "No avatar provided" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { avatar: avatarUrl },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ avatar: user.avatar });
    } catch (err: any) {
        console.error("updateAvatar error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateUsername = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const { username } = req.body;

        if (!username || username.trim() === "") {
            return res.status(400).json({ msg: "Username is required" });
        }

        if (username.trim().length < 3) {
            return res
                .status(400)
                .json({ msg: "Username must be at least 3 characters long" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { username: username.trim() },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ username: user.username });
    } catch (err: any) {
        console.error("updateUsername error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updatePassword = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const { newPassword, confirmPassword } = req.body;

        if (!newPassword || !confirmPassword) {
            return res.status(400).json({ msg: "Both fields are required" });
        }

        if (newPassword.length < 6) {
            return res
                .status(400)
                .json({ msg: "Password must be at least 6 characters long" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const user = await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ msg: "Password updated successfully" });
    } catch (err: any) {
        console.error("updatePassword error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};
