import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    userId?: string;
}

// Register
export const registerUser = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ msg: "Email already exists." });
        }

        const hashed = await bcrypt.hash(password, 10);
        console.log("Uploaded file:", req.file);

        const avatarUrl = req.file?.path;

        const user = await User.create({
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

        const token = jwt.sign({ userId: user._id }, jwtSecret, {
            expiresIn: "7d",
        });

        res.status(201).json({
            msg: "User successfully registered.",
            token,
        });
    } catch (err: any) {
        console.error("Register error:", err.message);
        console.error(err.stack);
        res.status(500).json({ msg: err.message || "Internal server error." });
    }
};

// Login
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ msg: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(404)
                .json({ msg: "No user found with the provided email." });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ msg: "Incorrect password." });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res
                .status(500)
                .json({ msg: "JWT secret is not configured." });
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret, {
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
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ msg: "Internal server error." });
    }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    const user = await User.findById(req.userId).select("-password");
    res.json(user);
};
