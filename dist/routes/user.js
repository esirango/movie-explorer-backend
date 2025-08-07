"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinaryUpload_js_1 = __importDefault(require("../middlewares/cloudinaryUpload.js"));
const userController_js_1 = require("../controllers/userController.js");
const auth_js_1 = require("../middlewares/auth.js");
const router = express_1.default.Router();
router.patch("/avatar", auth_js_1.authMiddleware, cloudinaryUpload_js_1.default.single("avatar"), userController_js_1.updateAvatar);
router.patch("/username", auth_js_1.authMiddleware, userController_js_1.updateUsername);
router.patch("/password", auth_js_1.authMiddleware, userController_js_1.updatePassword);
exports.default = router;
