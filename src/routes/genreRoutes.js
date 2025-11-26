import { Router } from "express";
import { createGenre } from "../controllers/genreController.js";

const genreRoutes = Router();

genreRoutes.post("/", createGenre);

export default genreRoutes;