import express from "express";
import {
    addFavorite,
    removeFavorite,
    listFavorites,
} from "../controllers/moviesController.js";

const router = express.Router();

router.get("/favorites", listFavorites);
router.post("/favorites", addFavorite);
router.delete("/favorites/:movieId", removeFavorite);

export default router;
