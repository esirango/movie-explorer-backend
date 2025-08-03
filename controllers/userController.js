import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const updateAvatar = async (req, res) => {
    try {
        const userId = req.userId;

        let avatarUrl;

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
    } catch (err) {
        console.error("updateAvatar error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateUsername = async (req, res) => {
    try {
        const userId = req.userId;
        const { username } = req.body;

        if (!username || username.trim() === "") {
            return res.status(400).json({ msg: "Username is required" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { username },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ username: user.username });
    } catch (err) {
        console.error("updateUsername error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const userId = req.userId;
        const { newPassword, confirmPassword } = req.body;

        if (!newPassword || !confirmPassword) {
            return res.status(400).json({ msg: "Both fields are required" });
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
        س;
    } catch (err) {
        console.error("updatePassword error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};
