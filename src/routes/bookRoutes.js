import { Router } from "express";
import { createBook, getAllBooks, getBook } from "../controllers/bookController.js";

const bookRoutes = Router();

bookRoutes.post("/", createBook);
bookRoutes.get("/:id", getBook);
bookRoutes.get("/", getAllBooks);

export default bookRoutes;