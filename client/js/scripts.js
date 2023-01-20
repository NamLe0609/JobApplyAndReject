/*!
 * Start Bootstrap - Resume v7.0.5 (https://startbootstrap.com/theme/resume)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
 */
/* Courtesy of ChatGPT for generating random companies for the JSON database*/
//
// Scripts 
//

//
//FOR FRONT END FUNCTIONALITY
//
window.addEventListener("DOMContentLoaded", (event) => {
  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelectorAll(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll(".nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler[0]).display !== "none" ||
      window.getComputedStyle(navbarToggler[1]).display !== "none") {
        navbarToggler[0].click();
        navbarToggler[1].click();
      }
    });
  });
});

// Starting from here is not from template
const endpointRoot = 'http://127.0.0.1:8090/';

//
//Pages and their navbars
//

let welcomePage = document.getElementById("welcomePage");
let companySelectPage = document.getElementById("companySelectPage");
let companyRegisterLoginPage = document.getElementById("companyRegisterLoginPage");
let employeeContent = document.getElementById("employeeContent");
let employerContent = document.getElementById("employerContent");
let sideEmployeeNav = document.getElementById("sideEmployeeNav");

//
//Fields to be filled in
//

//Employee fields

//About
employeeFirstName = document.getElementById("employeeFirstNameField");
employeeLastName = document.getElementById("employeeLastNameField");
employeeCountry = document.getElementById("employeeCountryField");
employeePhoneNo = document.getElementById("employeePhoneNoField");
employeeEmail = document.getElementById("employeeEmailField");

//Job Experience
jobTitleField0 = document.getElementById("jobTitleField0");
jobCompanyField0 = document.getElementById("jobCompanyField0");
jobDurationField0 = document.getElementById("jobDurationField0");

jobTitleField1 = document.getElementById("jobTitleField1");
jobCompanyField1 = document.getElementById("jobCompanyField1");
jobDurationField1 = document.getElementById("jobDurationField1");

jobTitleField2 = document.getElementById("jobTitleField2");
jobCompanyField2 = document.getElementById("jobCompanyField2");
jobDurationField2 = document.getElementById("jobDurationField2");

//Education
eduUniField0 = document.getElementById("eduUniField0");
eduDegreeField0 = document.getElementById("eduDegreeField0");
eduGradeField0 = document.getElementById("eduGradeField0");

eduUniField1 = document.getElementById("eduUniField1");
eduDegreeField1 = document.getElementById("eduDegreeField1");
eduGradeField1 = document.getElementById("eduGradeField1");

eduUniField2 = document.getElementById("eduUniField2");
eduDegreeField2 = document.getElementById("eduDegreeField2");
eduGradeField2 = document.getElementById("eduGradeField2");

//Skills
skillField0 = document.getElementById("skillField0");
skillField1 = document.getElementById("skillField1");
skillField2 = document.getElementById("skillField2");

//Employer fields
companyNameField = document.getElementById("companyNameField");
companyTypeField = document.getElementById("companyTypeField");
companyLocationField = document.getElementById("companyLocationField");
companyContactNoField = document.getElementById("companyContactNoField");
companyEmailField = document.getElementById("companyEmailField");

//Description
companyDescriptionField = document.getElementById("companyDescriptionField");

//Looking for
companyLookingForField = document.getElementById("companyLookingForField");

//
//Load both version of page (and forms)
//

//Load company choose
let employeePageBtn = document.getElementById("employeePageBtn");
employeePageBtn.addEventListener("click", (event) => {
  event.preventDefault();
  welcomePage.setAttribute("hidden", "");
  companySelectPage.removeAttribute("hidden");
});

//Load company register/"login"
let employerPageBtn = document.getElementById("employerPageBtn");
employerPageBtn.addEventListener("click", (event) => {
  event.preventDefault();
  welcomePage.setAttribute("hidden", "");
  companyRegisterLoginPage.removeAttribute("hidden");
});

//Load main employee view (Company Select Form)
let companySelectForm = document.getElementById("companySelectForm");
companySelectForm.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();
    event.stopPropagation();
    companySelectPage.setAttribute("hidden", "");
    sideEmployeeNav.removeAttribute("hidden");
    employeeContent.removeAttribute("hidden");
  },
);

//Submit company register form
async function registerCompany() {
let registerCompanyForm = document.getElementById("registerCompanyForm");
registerCompanyForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();
    const data = new FormData(registerCompanyForm);
    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    const dataJSON = JSON.stringify(Object.fromEntries(data));
    const response = await fetch(endpointRoot + 'registerCompanyForm',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: dataJSON
    });
    registerCompanyForm.reset();
  },
);
}
//Load main employer view (Employer "Login" Form)
let companyLoginForm = document.getElementById("companyLoginForm");
companyLoginForm.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();
    event.stopPropagation();
    companyRegisterLoginPage.setAttribute("hidden", "");
    sideEmployerNav.removeAttribute("hidden");
    employerContent.removeAttribute("hidden");
  },
);

//Idea for template literals to add html from:
//https://stackoverflow.com/questions/16270761/how-to-insert-a-large-block-of-html-in-javascript

//JS for adding new fields for skills
let submitEmployeeSection = document.getElementById("submitEmployeeForm");

let addSkillBtn = document.getElementById("button-add-skills");
let counterSkill = 1;
addSkillBtn.addEventListener("click", (event) => {
  if (counterSkill < 3) {
    event.preventDefault();
    let submitEmployeeFormBtn = document.getElementById(
      "submitEmployeeFormBtn"
    );
    let div = document.createElement("div");
    div.setAttribute("class", "row mb-3");
    div.innerHTML = `
        <div class="col-auto">
            <button class="btn btn-outline-secondary"
             type="button" id="button-remove-skills${counterSkill}">-</button>
        </div>
        <div class="col-auto mb-1">
            <input id="skill${counterSkill}" type="text" class="form-control" placeholder="Skill" aria-label="Skill" required>
        </div>
    `;
    counterSkill++;
    submitEmployeeSection.insertBefore(div, submitEmployeeFormBtn);
    addDeleteToBtnSkill(`button-remove-skills${counterSkill - 1}`);
  }
});

function addDeleteToBtnSkill(id) {
  let btn = document.getElementById(id);
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    counterSkill--;
    btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
  });
}

//JS for adding new fields for education
let addEduBtn = document.getElementById("button-add-education");
let counterEducation = 1;
addEduBtn.addEventListener("click", (event) => {
  if (counterEducation < 3) {
    event.preventDefault();
    let jobForm = document.getElementById("jobForm");
    let div = document.createElement("div");
    div.setAttribute("class", "row mb-3");
    div.innerHTML = `
    <div class="col-auto mb-1">
      <input id="uni${counterEducation}" type="text" class="form-control" placeholder="University" aria-label="University" required>
    </div>
    <div class="col-auto mb-1">
      <input id="degree${counterEducation}" type="text" class="form-control" placeholder="Degree of Subject" aria-label="Degree" required>
    </div>
    <div class="col-auto mb-1">
      <input id="gradeEdu${counterEducation}" type="text" class="form-control" placeholder="Grade" aria-label="Grade" required>
    </div>
    <div class="col-auto">
      <button class="btn btn-outline-secondary" type="button" id="button-remove-education${counterEducation}">-</button>
    </div>
    `;
    counterEducation++;
    submitEmployeeSection.insertBefore(div, jobForm);
    addDeleteToBtnEdu(`button-remove-education${counterEducation - 1}`);
  }
});

function addDeleteToBtnEdu(id) {
  let btn = document.getElementById(id);
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    counterEducation--;
    btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
  });
}

//JS for adding new fields for job
let addJobBtn = document.getElementById("button-add-job");
let counterJob = 1;
addJobBtn.addEventListener("click", (event) => {
  if (counterJob < 3) {
    event.preventDefault();
    let skillForm = document.getElementById("skillForm");
    let div = document.createElement("div");
    div.setAttribute("class", "row mb-3");
    div.innerHTML = `
    <div class="col-auto mb-1">
      <input id="job${counterJob}" type="text" class="form-control" placeholder="Job title" aria-label="Job title" required>
    </div>
    <div class="col-auto mb-1">
      <input id="company${counterJob}" type="text" class="form-control" placeholder="Degree of Subject" aria-label="Degree" required>
    </div>
    <div class="col-auto mb-1">
      <input id="durationJob${counterJob}" type="text" class="form-control" placeholder="Duration" aria-label="Duration" required>
    </div>
    <div class="col-auto">
      <button class="btn btn-outline-secondary" type="button" id="button-remove-job${counterJob}">-</button>
    </div>
    `;
    counterJob++;
    submitEmployeeSection.insertBefore(div, skillForm);
    addDeleteToBtnJob(`button-remove-job${counterJob - 1}`);
  }
});

function addDeleteToBtnJob(id) {
  let btn = document.getElementById(id);
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    counterJob--;
    btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
  });
}

document.addEventListener('DOMContentLoaded', registerCompany);