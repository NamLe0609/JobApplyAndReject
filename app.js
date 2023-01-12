const express = require("express");
const app = express();

app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  console.log("Here");
  res.status(500).json({ essage: "Error" });
});

module.exports = app;
