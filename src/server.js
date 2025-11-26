const express = require("express");
const { default: genreRoutes } = require("./routes/genreRoutes");
const { default: bookRoutes } = require("./routes/bookRoutes");
require("dotenv").config({quiet: true});

const app = express();
app.use(express.json());


app.use("/api/books", bookRoutes)
app.use("/api/genre", genreRoutes)



app.listen(3000,()=>{
  console.log("server is running on Port: 3000 ");
})