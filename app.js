// Some code from Steven Bradley, our course lecturer!
// From: https://github.com/stevenaeola/progblack_2223/blob/main/Pasta/app.js

const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();

const fs = require('fs');
const fileNameForJSON = './companyDB.json';
const companies = require(fileNameForJSON);

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'client')));

// GET request to fetch initial page and display it
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// GET request to fetch list of company name
app.get('/company/nameAndID', (req, res) => {
  // Code from ChatGPT
  const companyNamesWithId = Object.entries(companies.companies).map(
    ([id, company]) => ({ id, companyName: company.name })
  );
  res.json(companyNamesWithId);
});

// GET request to fetch all data from a given company
app.get('/company/:companyID', (req, res) => {
  const companyID = req.params.companyID;
  res.json(companies.companies[companyID]);
});

// POST request to add company to companyDB
app.post('/company/new', (req, res) => {
  const key = uuidv4();
  const companyToAdd = req.body;
  companyToAdd.applicants = [];
  companies.companies[key] = companyToAdd;
  fs.writeFileSync(fileNameForJSON, JSON.stringify(companies));
  res.send(key);
});

// POST request to add employee to company
app.post('/company/apply/:companyID', (req, res) => {
  const key = uuidv4();
  const companyID = req.params.companyID;
  companies.companies[companyID].applicants = req.body;
  fs.writeFileSync(fileNameForJSON, JSON.stringify(companies));
  res.send(key);
});

module.exports = app;
