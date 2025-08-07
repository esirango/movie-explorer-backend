import { Request, Response } from "express";
import User from "../models/User";

interface AuthRequest extends Request {
    userId?: string;
}

export const addFavorite = async (req: AuthRequest, res: Response) => {
    try {
        const { movieId, title, poster_path, vote_average } = req.body;
        const userId = req?.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!movieId || !title || !poster_path || !vote_average) {
            return res
                .status(400)
                .json({ message: "All movie fields are required." });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const alreadyExists = user.favorites.some(
            (fav: any) => fav.movieId === movieId
        );

        if (alreadyExists) {
            return res
                .status(400)
                .json({ message: "Movie already in favorites" });
        }

        user.favorites.push({ movieId, title, poster_path, vote_average });
        await user.save();

        return res.status(201).json({
            message: "Movie added to favorites",
            favorites: user.favorites,
        });
    } catch (error) {
        console.error("Error in addFavorite:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const removeFavorite = async (req: AuthRequest, res: Response) => {
    const movieId = req.params.movieId;
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.favorites.pull({ movieId });
    await user.save();

    res.json(user.favorites);
};

export const listFavorites = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user.favorites);
};
