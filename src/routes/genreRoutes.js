import { Router } from "express";
import { createGenre, deleteGenre, getAllGenre, getGenreById, updateGenre } from "../controllers/genreController.js";

const genreRoutes = Router();

genreRoutes.post("/", createGenre);
genreRoutes.get("/", getAllGenre);
genreRoutes.get("/:id", getGenreById);
genreRoutes.delete("/", deleteGenre);
genreRoutes.put("/", updateGenre);

export default genreRoutes;