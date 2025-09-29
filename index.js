

import express from "express";
const app = express();

// require("dotenv").config();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// const blog = require('./routes/blog');
// app.use("/api", blog);   

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(` server at https://localhost:${PORT}`);
});