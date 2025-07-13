import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    movieId: String,
    title: String,
    posterPath: String,
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    favorites: [favoriteSchema],
});

export default mongoose.model("User", userSchema);
