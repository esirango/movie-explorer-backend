"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const favoriteSchema = new mongoose_1.default.Schema({
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    poster_path: { type: String, required: true },
    vote_average: { type: Number, required: true },
});
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    favorites: [favoriteSchema],
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
