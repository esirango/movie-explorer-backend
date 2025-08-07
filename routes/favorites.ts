import express from "express";
import {
    addFavorite,
    removeFavorite,
    listFavorites,
} from "../controllers/moviesController";

const router = express.Router();

router.get("/list", listFavorites);
router.post("/add", addFavorite);
router.delete("/remove/:movieId", removeFavorite);

export default router;
