"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const favorites_1 = __importDefault(require("./routes/favorites"));
const user_1 = __importDefault(require("./routes/user"));
const favorites_2 = __importDefault(require("./routes/favorites"));
const auth_2 = require("./middlewares/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static("uploads"));
app.use("/api/auth", auth_1.default);
app.use("/api/user", user_1.default);
app.use("/api/movies", auth_2.authMiddleware, favorites_1.default);
app.use("/api/favorites", auth_2.authMiddleware, favorites_2.default);
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is not defined!");
}
mongoose_1.default
    .connect(mongoUri)
    .then(() => app.listen(process.env.PORT || 4000, () => console.log("✅ Server running")))
    .catch((err) => console.log("❌ DB Error:", err));
