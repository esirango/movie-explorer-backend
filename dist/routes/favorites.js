"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesController_js_1 = require("../controllers/moviesController.js");
const router = express_1.default.Router();
router.get("/list", moviesController_js_1.listFavorites);
router.post("/add", moviesController_js_1.addFavorite);
router.delete("/remove/:movieId", moviesController_js_1.removeFavorite);
exports.default = router;
