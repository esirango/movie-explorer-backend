"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFavorites = exports.removeFavorite = exports.addFavorite = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const addFavorite = async (req, res) => {
    try {
        const { movieId, title, poster_path, vote_average } = req.body;
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!movieId || !title || !poster_path || !vote_average) {
            return res
                .status(400)
                .json({ message: "All movie fields are required." });
        }
        const user = await User_js_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const alreadyExists = user.favorites.some((fav) => fav.movieId === movieId);
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
    }
    catch (error) {
        console.error("Error in addFavorite:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.addFavorite = addFavorite;
const removeFavorite = async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User_js_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.favorites.pull({ movieId });
    await user.save();
    res.json(user.favorites);
};
exports.removeFavorite = removeFavorite;
const listFavorites = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User_js_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user.favorites);
};
exports.listFavorites = listFavorites;
