/*!
 * Start Bootstrap - Resume v7.0.5 (https://startbootstrap.com/theme/resume)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
 */
/* Courtesy of ChatGPT for generating random companies for the JSON database */
//
// Scripts
//

//
// FOR FRONT END FUNCTIONALITY
//
window.addEventListener('DOMContentLoaded', (event) => {
  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelectorAll('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll('.nav-link')
  );
  // eslint-disable-next-line array-callback-return
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
      if (
        window.getComputedStyle(navbarToggler[0]).display !== 'none' ||
        window.getComputedStyle(navbarToggler[1]).display !== 'none'
      ) {
        navbarToggler[0].click();
        navbarToggler[1].click();
      }
    });
  });
});

// Starting from here is not from template
const endpointRoot = 'http://127.0.0.1:8090/';

//
// Pages and their navbars
//

const welcomePage = document.getElementById('welcomePage');
const companySelectPage = document.getElementById('companySelectPage');
const companyRegisterLoginPage = document.getElementById(
  'companyRegisterLoginPage'
);
const employeeContent = document.getElementById('employeeContent');
const employerContent = document.getElementById('employerContent');
const sideEmployeeNav = document.getElementById('sideEmployeeNav');
const sideEmployerNav = document.getElementById('sideEmployerNav');

//
// Fields to be filled in
//

// Employee fields

// About
const employeeFirstName = document.getElementById('employeeFirstNameField');
const employeeLastName = document.getElementById('employeeLastNameField');
const employeeCountry = document.getElementById('employeeCountryField');
const employeePhoneNo = document.getElementById('employeePhoneNoField');
const employeeEmail = document.getElementById('employeeEmailField');

// Job Experience
const jobTitleField0 = document.getElementById('jobTitleField0');
const jobCompanyField0 = document.getElementById('jobCompanyField0');
const jobDurationField0 = document.getElementById('jobDurationField0');

const jobTitleField1 = document.getElementById('jobTitleField1');
const jobCompanyField1 = document.getElementById('jobCompanyField1');
const jobDurationField1 = document.getElementById('jobDurationField1');

const jobTitleField2 = document.getElementById('jobTitleField2');
const jobCompanyField2 = document.getElementById('jobCompanyField2');
const jobDurationField2 = document.getElementById('jobDurationField2');

// Education
const eduUniField0 = document.getElementById('eduUniField0');
const eduDegreeField0 = document.getElementById('eduDegreeField0');
const eduGradeField0 = document.getElementById('eduGradeField0');

const eduUniField1 = document.getElementById('eduUniField1');
const eduDegreeField1 = document.getElementById('eduDegreeField1');
const eduGradeField1 = document.getElementById('eduGradeField1');

const eduUniField2 = document.getElementById('eduUniField2');
const eduDegreeField2 = document.getElementById('eduDegreeField2');
const eduGradeField2 = document.getElementById('eduGradeField2');

// Skills
const skillField0 = document.getElementById('skillField0');
const skillField1 = document.getElementById('skillField1');
const skillField2 = document.getElementById('skillField2');

// Employer fields
const companyNameField = document.getElementById('companyNameField');
const companyTypeField = document.getElementById('companyTypeField');
const companyLocationField = document.getElementById('companyLocationField');
const companyContactNoField = document.getElementById('companyContactNoField');
const companyEmailField = document.getElementById('companyEmailField');
const registerCompanySubmitResponse = document.getElementById(
  'registerCompanySubmitResponse'
);

// Description
const companyDescriptionField = document.getElementById('companyDescriptionField');

// Looking for
const companyLookingForField = document.getElementById('companyLookingForField');

//
// Load both version of page (and forms)
//

// Load company choose
const employeePageBtn = document.getElementById('employeePageBtn');
employeePageBtn.addEventListener('click', (event) => {
  event.preventDefault();
  welcomePage.setAttribute('hidden', '');
  companySelectPage.removeAttribute('hidden');
});

// Helper function to get company name and their id
async function getCompanyNameAndID () {
  const companyNameAndIDResponse = await fetch(
    endpointRoot + 'company/nameAndID'
  );
  const companyNameAndID = JSON.parse(await companyNameAndIDResponse.text());
  const chooseCompanySelect = document.getElementById('chooseCompanySelect');
  for (const item of companyNameAndID) {
    const option = document.createElement('option');
    option.text = item.companyName;
    option.value = item.id;
    chooseCompanySelect.appendChild(option);
  }
}

// Load company register/"login"
const employerPageBtn = document.getElementById('employerPageBtn');
employerPageBtn.addEventListener('click', (event) => {
  event.preventDefault();
  welcomePage.setAttribute('hidden', '');
  companyRegisterLoginPage.removeAttribute('hidden');
  getCompanyNameAndID();
});

// Helper function to load employee page by getting company's information
async function loadEmployeePage (companyID) {
  const companyDetailsResponse = await fetch(
    endpointRoot + `company/${companyID}`
  );
  const companyDetail = JSON.parse(await companyDetailsResponse.text());
  companyNameField.innerText = companyDetail.name;
  companyTypeField.innerText = companyDetail.type;
  companyLocationField.innerText = companyDetail.countryOfOrigin;
  companyContactNoField.innerText = companyDetail.contactNumber;
  companyEmailField.innerText = companyDetail.emailAddress;
  companyDescriptionField.innerText = companyDetail.description;
  companyLookingForField.innerText = companyDetail.lookingFor;
}

// Load main employee view (Company Select Form)
const companySelectForm = document.getElementById('companySelectForm');
const chooseCompanySelect = document.getElementById('chooseCompanySelect');
companySelectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  event.stopPropagation();
  loadEmployeePage(chooseCompanySelect.value);
  sideEmployeeNav.removeAttribute('hidden');
  employeeContent.removeAttribute('hidden');
  companySelectPage.setAttribute('hidden', '');
});

// Submit employee application form
async function applyToCompany () {
  const submitEmployeeForm = document.getElementById('submitEmployeeForm');
  submitEmployeeForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(submitEmployeeForm);
    const dataJSON = JSON.stringify(Object.fromEntries(data));
    const response = await fetch(endpointRoot + 'company/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: dataJSON
    });
    registerCompanySubmitResponse.innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Form has been submitted! Your Company ID is: ${await response.text()} </strong> You can now check if you have gotten any applications by inputting your Company ID below
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    registerCompanyForm.reset();
  });
}

// Submit company register form
async function registerCompany () {
  const registerCompanyForm = document.getElementById('registerCompanyForm');
  registerCompanyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(registerCompanyForm);
    const dataJSON = JSON.stringify(Object.fromEntries(data));
    const response = await fetch(endpointRoot + 'company/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: dataJSON
    });
    registerCompanySubmitResponse.innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Form has been submitted! Your Company ID is: ${await response.text()} </strong> You can now check if you have gotten any applications by inputting your Company ID below
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    registerCompanyForm.reset();
  });
}
// Load main employer view (Employer "Login" Form)
const companyLoginForm = document.getElementById('companyLoginForm');
companyLoginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  event.stopPropagation();
  companyRegisterLoginPage.setAttribute('hidden', '');
  sideEmployerNav.removeAttribute('hidden');
  employerContent.removeAttribute('hidden');
});

// Idea for template literals to add html from:
// https://stackoverflow.com/questions/16270761/how-to-insert-a-large-block-of-html-in-javascript

// JS for adding new fields for skills
const submitEmployeeSection = document.getElementById('submitEmployeeForm');

const addSkillBtn = document.getElementById('button-add-skills');
let counterSkill = 1;
addSkillBtn.addEventListener('click', (event) => {
  if (counterSkill < 3) {
    event.preventDefault();
    const submitEmployeeFormBtn = document.getElementById(
      'submitEmployeeFormBtn'
    );
    const div = document.createElement('div');
    div.setAttribute('class', 'row mb-3');
    div.innerHTML = `
        <div class="col-auto">
            <button class="btn btn-outline-secondary"
             type="button" id="button-remove-skills${counterSkill}">-</button>
        </div>
        <div class="col-auto mb-1">
            <input name="skill${counterSkill}" id="skill${counterSkill}" type="text" class="form-control" placeholder="Skill" aria-label="Skill" required>
        </div>
    `;
    counterSkill++;
    submitEmployeeSection.insertBefore(div, submitEmployeeFormBtn);
    addDeleteToBtnSkill(`button-remove-skills${counterSkill - 1}`);
  }
});

function addDeleteToBtnSkill (id) {
  const btn = document.getElementById(id);
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    counterSkill--;
    btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
  });
}

// JS for adding new fields for education
const addEduBtn = document.getElementById('button-add-education');
let counterEducation = 1;
addEduBtn.addEventListener('click', (event) => {
  if (counterEducation < 3) {
    event.preventDefault();
    const jobForm = document.getElementById('jobForm');
    const div = document.createElement('div');
    div.setAttribute('class', 'row mb-3');
    div.innerHTML = `
    <div class="col-auto mb-1">
      <input name="uni${counterEducation}" id="uni${counterEducation}" type="text" class="form-control" placeholder="University" aria-label="University" required>
    </div>
    <div class="col-auto mb-1">
      <input name="degree${counterEducation} id="degree${counterEducation}" type="text" class="form-control" placeholder="Degree of Subject" aria-label="Degree" required>
    </div>
    <div class="col-auto mb-1">
      <input name="gradeEdu${counterEducation}" id="gradeEdu${counterEducation}" type="text" class="form-control" placeholder="Grade" aria-label="Grade" required>
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

function addDeleteToBtnEdu (id) {
  const btn = document.getElementById(id);
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    counterEducation--;
    btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
  });
}

// JS for adding new fields for job
const addJobBtn = document.getElementById('button-add-job');
let counterJob = 1;
addJobBtn.addEventListener('click', (event) => {
  if (counterJob < 3) {
    event.preventDefault();
    const skillForm = document.getElementById('skillForm');
    const div = document.createElement('div');
    div.setAttribute('class', 'row mb-3');
    div.innerHTML = `
    <div class="col-auto mb-1">
      <input name="job${counterJob}" id="job${counterJob}" type="text" class="form-control" placeholder="Job title" aria-label="Job title" required>
    </div>
    <div class="col-auto mb-1">
      <input name="company${counterJob}" id="company${counterJob}" type="text" class="form-control" placeholder="Degree of Subject" aria-label="Degree" required>
    </div>
    <div class="col-auto mb-1">
      <input name="durationJob${counterJob}" id="durationJob${counterJob}" type="text" class="form-control" placeholder="Duration" aria-label="Duration" required>
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

function addDeleteToBtnJob (id) {
  const btn = document.getElementById(id);
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    counterJob--;
    btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
  });
}

document.addEventListener('DOMContentLoaded', getCompanyNameAndID);
document.addEventListener('DOMContentLoaded', registerCompany);
