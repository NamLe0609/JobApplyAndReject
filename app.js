//Some code from Steven Bradley, our course lecturer!
//From: https://github.com/stevenaeola/progblack_2223/blob/main/Pasta/app.js

const {v4 : uuidv4} = require('uuid');
const express = require('express');
const app = express();

const fs = require('fs');
const fileNameForJSON = './companyDB.json';
const companies = require(fileNameForJSON);

app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "client")));

//GET request to fetch initial page and display it
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

//POST request to add company to companyDB
app.post("/registerCompanyForm", (req, res) => {
  //Code here
  let key = uuidv4();
  let companyToAdd = req.body;
  companyToAdd["Applicants"] = []
  companies["companies"][key] = companyToAdd;
  fs.writeFileSync(fileNameForJSON, JSON.stringify(companies));
});

module.exports = app;
