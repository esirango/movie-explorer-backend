import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}

export interface AuthRequest extends Request {
    userId?: string;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT_SECRET is not defined!");
        return res.status(500).json({ msg: "Internal Server Error" });
    }

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        console.log("Decoded token:", decoded);
        req.userId = decoded.userId;
        next();
    } catch (err: any) {
        console.error("JWT error:", err.message);
        return res.status(401).json({ msg: "Token invalid or expired" });
    }
};
