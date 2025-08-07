"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinaryUpload_1 = __importDefault(require("../middlewares/cloudinaryUpload"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.patch("/avatar", auth_1.authMiddleware, cloudinaryUpload_1.default.single("avatar"), userController_1.updateAvatar);
router.patch("/username", auth_1.authMiddleware, userController_1.updateUsername);
router.patch("/password", auth_1.authMiddleware, userController_1.updatePassword);
exports.default = router;
