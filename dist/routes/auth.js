"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinaryUpload_js_1 = __importDefault(require("../middlewares/cloudinaryUpload.js"));
const authController_js_1 = require("../controllers/authController.js");
const auth_js_1 = require("../middlewares/auth.js");
const userController_js_1 = require("../controllers/userController.js");
const router = express_1.default.Router();
router.patch("/avatar", cloudinaryUpload_js_1.default.single("avatar"), userController_js_1.updateAvatar);
router.post("/register", cloudinaryUpload_js_1.default.single("avatar"), authController_js_1.registerUser);
router.post("/login", authController_js_1.loginUser);
router.get("/me", auth_js_1.authMiddleware, authController_js_1.getCurrentUser);
exports.default = router;
