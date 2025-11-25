const { createBook } = require("./controllers/bookController");
const express = require("express");

const app = express();
app.use(express.json());


app.post("/books", createBook)