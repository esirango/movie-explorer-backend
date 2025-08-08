"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    console.log("Auth middleware reached");
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No token or malformed token");
        return res.status(401).json({ msg: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT_SECRET not set");
        return res.status(500).json({ msg: "Internal Server Error" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log("Decoded token:", decoded);
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        console.error("JWT error:", err.name, err.message);
        return res.status(401).json({ msg: "Token invalid or expired" });
    }
};
exports.authMiddleware = authMiddleware;
