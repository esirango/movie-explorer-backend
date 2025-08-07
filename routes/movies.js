import express from "express";
import {
    addFavorite,
    removeFavorite,
    listFavorites,
} from "../controllers/moviesController.js";

const router = express.Router();

router.get("/api/favorites", listFavorites);
router.post("/api/favorites", addFavorite);
router.delete("/api/favorites/:movieId", removeFavorite);

export default router;
