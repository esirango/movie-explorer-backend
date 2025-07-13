import User from "../models/User.js";

export const addFavorite = async (req, res) => {
    const { movieId, title, posterPath } = req.body;
    const user = await User.findById(req.userId);

    if (user.favorites.find((f) => f.movieId === movieId)) {
        return res.status(400).json({ msg: "Already in favorites" });
    }

    user.favorites.push({ movieId, title, posterPath });
    await user.save();
    res.json(user.favorites);
};

export const removeFavorite = async (req, res) => {
    const { movieId } = req.params;
    const user = await User.findById(req.userId);
    user.favorites = user.favorites.filter((f) => f.movieId !== movieId);
    await user.save();
    res.json(user.favorites);
};

export const listFavorites = async (req, res) => {
    const user = await User.findById(req.userId);
    res.json(user.favorites);
};
