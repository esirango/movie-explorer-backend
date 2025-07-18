import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register
export const registerUser = async (req, res) => {
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

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(201).json({
            msg: "User successfully registered.",
            token,
        });
    } catch (err) {
        console.error("Register error:", err.message);
        console.error(err.stack); // نمایش trace کامل
        res.status(500).json({ msg: err.message || "Internal server error." });
    }
};

// Login
export const loginUser = async (req, res) => {
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

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
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

export const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
};
