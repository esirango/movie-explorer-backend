import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    poster_path: { type: String, required: true },
    vote_average: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    favorites: [favoriteSchema],
});
const User = mongoose.model("User", userSchema);

export default User;
