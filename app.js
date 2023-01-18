const express = require("express");
const app = express();

app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/sendForm", (req, res) => {
  
});

module.exports = app;
