"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.updateUsername = exports.updateAvatar = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const updateAvatar = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        let avatarUrl;
        if (req.file) {
            avatarUrl = req.file.path;
        }
        else if (req.body.url) {
            avatarUrl = req.body.url;
        }
        else {
            return res.status(400).json({ msg: "No avatar provided" });
        }
        const user = await User_js_1.default.findByIdAndUpdate(userId, { avatar: avatarUrl }, { new: true });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({ avatar: user.avatar });
    }
    catch (err) {
        console.error("updateAvatar error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};
exports.updateAvatar = updateAvatar;
const updateUsername = async (req, res) => {
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
        const user = await User_js_1.default.findByIdAndUpdate(userId, { username: username.trim() }, { new: true });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({ username: user.username });
    }
    catch (err) {
        console.error("updateUsername error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};
exports.updateUsername = updateUsername;
const updatePassword = async (req, res) => {
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
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        const user = await User_js_1.default.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({ msg: "Password updated successfully" });
    }
    catch (err) {
        console.error("updatePassword error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};
exports.updatePassword = updatePassword;
