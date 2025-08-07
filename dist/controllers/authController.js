"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Register
const registerUser = async (req, res) => {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({ msg: "All fields are required." });
    }
    try {
        const existing = await User_1.default.findOne({ email });
        if (existing) {
            return res.status(409).json({ msg: "Email already exists." });
        }
        const hashed = await bcryptjs_1.default.hash(password, 10);
        console.log("Uploaded file:", req.file);
        const avatarUrl = req.file?.path;
        const user = await User_1.default.create({
            email,
            password: hashed,
            username,
            avatar: avatarUrl,
        });
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res
                .status(500)
                .json({ msg: "JWT secret is not configured." });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, jwtSecret, {
            expiresIn: "7d",
        });
        res.status(201).json({
            msg: "User successfully registered.",
            token,
        });
    }
    catch (err) {
        console.error("Register error:", err.message);
        console.error(err.stack);
        res.status(500).json({ msg: err.message || "Internal server error." });
    }
};
exports.registerUser = registerUser;
// Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ msg: "Email and password are required." });
    }
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ msg: "No user found with the provided email." });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ msg: "Incorrect password." });
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res
                .status(500)
                .json({ msg: "JWT secret is not configured." });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, jwtSecret, {
            expiresIn: "7d",
        });
        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                avatar: user.avatar,
            },
        });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ msg: "Internal server error." });
    }
};
exports.loginUser = loginUser;
const getCurrentUser = async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const user = await User_1.default.findById(req.userId).select("-password");
    res.json(user);
};
exports.getCurrentUser = getCurrentUser;
