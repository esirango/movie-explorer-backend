import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
