/*!
 * Start Bootstrap - Resume v7.0.5 (https://startbootstrap.com/theme/resume)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
 */
//
// Scripts
//
window.addEventListener("DOMContentLoaded", (event) => {

  // Activate Bootstrap scrollspy on the main nav element
  let sideNavBar = document.body.querySelector("#sideNav");
  if (sideNavBar) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#sideNav",
      offset: 74,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

// Starting from here is not from template
let welcomePage = document.getElementById("welcomePage");
let companySelectPage = document.getElementById("companySelectPage");
let employeeContent = document.getElementById("employeeContent");
let sideNav = document.getElementById("sideNav");
//Load employee version of page

//Load company choose
let employeePageBtn = document.getElementById("employeePageBtn");
employeePageBtn.addEventListener("click", (event) => {
  event.preventDefault();
  welcomePage.setAttribute("hidden", "");
  companySelectPage.removeAttribute("hidden");
});

//Load main employee view
//Code from: https://tom-select.js.org/examples/validation/?
let companySelectForm = document.getElementById("companySelectForm");
companySelectForm.addEventListener("submit", (event) => {
  companySelectForm.classList.add("was-validated");
  if (companySelectForm.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    companySelectPage.setAttribute("hidden", "");
    sideNav.removeAttribute("hidden");
    employeeContent.removeAttribute("hidden");
  }
}, false);

//Idea for template literals to add html from:
//https://stackoverflow.com/questions/16270761/how-to-insert-a-large-block-of-html-in-javascript

//JS for adding new fields for skills
let addSkillBtn = document.getElementById("button-add-skills");
let counterSkill = 1;
addSkillBtn.addEventListener("click", (event) => {
  if (counterSkill < 3) {
    event.preventDefault();
    let submitFormBtn = document.getElementById("submitFormBtn");
    let submitSection = document.getElementById("submitForm");
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
    submitSection.insertBefore(div, submitFormBtn);
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
    let submitSection = document.getElementById("submitForm");
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
      <input id="durationEdu${counterEducation}" type="text" class="form-control" placeholder="Duration" aria-label="Duration" required>
    </div>
    <div class="col-auto">
      <button class="btn btn-outline-secondary" type="button" id="button-remove-education${counterEducation}">-</button>
    </div>
    `;
    counterEducation++;
    submitSection.insertBefore(div, jobForm);
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
    let submitSection = document.getElementById("submitForm");
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
    submitSection.insertBefore(div, skillForm);
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
