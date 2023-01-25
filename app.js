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
  const companyNameWithId = Object.entries(companies.companies).map(
    ([id, company]) => ({ id, companyName: company.name })
  );
  res.json(companyNameWithId);
});

// GET request to fetch all data from a given company
app.get('/company/:companyID', (req, res) => {
  const companyID = req.params.companyID;
  res.json(companies.companies[companyID]);
});

// GET request to fetch all data from a given company
app.get('/company/:companyID/applicantNameAndID', (req, res) => {
  // Code adapted from ChatGPT
  const companyID = req.params.companyID;
  if (companyID in companies.companies) {
    const applicantNameWithId = Object.entries(
      companies.companies[companyID].applicants
    ).map(([id, applicant]) => ({
      id,
      applicantName: applicant.firstName + ' ' + applicant.lastName
    }));
    res.json(applicantNameWithId);
  } else {
    res.send(false);
  }
});

// GET request to fetch all data from a given company's chosen applicant
app.get('/company/:companyID/:applicantID', (req, res) => {
  const companyID = req.params.companyID;
  const applicantID = req.params.applicantID;
  res.json(companies.companies[companyID].applicants[applicantID]);
});

// POST request to add company to companyDB. Returns companyID
app.post('/company/new', (req, res) => {
  const key = uuidv4();
  const companyToAdd = req.body;
  companyToAdd.applicants = {};
  companies.companies[key] = companyToAdd;
  fs.writeFileSync(fileNameForJSON, JSON.stringify(companies));
  res.send(key);
});

// POST request to add employee to company. Returns new userID
app.post('/company/apply/:companyID', (req, res) => {
  const key = uuidv4();
  const companyID = req.params.companyID;
  companies.companies[companyID].applicants[key] = req.body;
  fs.writeFileSync(fileNameForJSON, JSON.stringify(companies));
  res.send(key);
});

module.exports = app;
