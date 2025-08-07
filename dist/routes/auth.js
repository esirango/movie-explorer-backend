"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinaryUpload_1 = __importDefault(require("../middlewares/cloudinaryUpload"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middlewares/auth");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.patch("/avatar", cloudinaryUpload_1.default.single("avatar"), userController_1.updateAvatar);
router.post("/register", cloudinaryUpload_1.default.single("avatar"), authController_1.registerUser);
router.post("/login", authController_1.loginUser);
router.get("/me", auth_1.authMiddleware, authController_1.getCurrentUser);
exports.default = router;
