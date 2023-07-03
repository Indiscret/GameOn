function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnClose = document.querySelector(".close")
const formData = document.querySelectorAll(".formData");

const formFirstName = document.getElementById("first");
const formLastName = document.getElementById("last");
const formEmail = document.getElementById("email");
const formBirthdate = document.getElementById("birthdate");
const formNumberTournaments = document.getElementById("quantity");
const formLocations = document.getElementsByName("location");
const formConditions = document.getElementById("checkbox1");

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal event
modalBtnClose.addEventListener("click", closeModal);

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Validation of all the inputs in the form before the submission
function validate() {
  
  const firstNameValid = validateName(formFirstName, document.getElementById("error-first"));
  const lastNameValid = validateName(formLastName, document.getElementById("error-last"));
  const emailValid = validateEmail();
  const birthdateValid = validateBirthdate();
  const numberTournamentValid = validateNumberTournaments();
  const locationValid = validateLocations();
  const conditionsValid = validateConditions();

  if (!firstNameValid || !lastNameValid || !emailValid || !birthdateValid || !numberTournamentValid || !locationValid || !conditionsValid) {
    return false;
  }
}

// Event listeners for the validation of the inputs
formFirstName.addEventListener("blur",function() {validateName(formFirstName, document.getElementById("error-first"))});
formLastName.addEventListener("blur", function() {validateName(formLastName, document.getElementById("error-last"))});
formEmail.addEventListener("blur",function() {validateEmail()});
formBirthdate.addEventListener("blur",function() {validateBirthdate()});
formNumberTournaments.addEventListener("blur",function() {validateNumberTournaments()});
formConditions.addEventListener("change",function() {validateConditions()});

// Validation of the first name input

function validateName(formName, errorFormName) {

  const nameRegExp = new RegExp("^[a-zA-Zàâäéèêëîïìôöòûüùç,.'-]+$");

  if (formName.value.length < 2 || !nameRegExp.test(formName.value)) {
    errorFormName.style.display = "block";
    errorFormName.innerHTML = "Veuillez saisir au minimum 2 caractères.";
    return false;
  } else {
    errorFormName.style.display = "none";
    errorFormName.innerHTML = "";
    return true;
  }
  
}

// Validation of the email input
function validateEmail() {

  const emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
  const errorEmail = document.getElementById("error-email");

  if (formEmail.value === "" || !emailRegExp.test(formEmail.value)) {
    errorEmail.style.display = "block";
    errorEmail.innerHTML = "Veuillez saisir une adresse e-mail valide.";
    return false;
  } else {
    errorEmail.style.display = "none";
    errorEmail.innerHTML = "";
    return true;
  }
}

// Validation of the birthdate input
function validateBirthdate() {

  const errorBirthdate = document.getElementById("error-birthdate");
  const today = new Date();
  const birthdate = new Date(formBirthdate.value);

  if (formBirthdate.value == "" || birthdate > today) {
    errorBirthdate.style.display = "block";
    errorBirthdate.innerHTML = "Veuillez saisir votre date de naissance valide au format JJ/MM/AAAA.";
    return false;
  } else {
    errorBirthdate.style.display = "none";
    errorBirthdate.innerHTML = "";
    return true;
  }
}

// Validation of the number of tournaments input
function validateNumberTournaments() {

  const errorNumberTournaments = document.getElementById("error-quantity");

  if (formNumberTournaments.value === "" || formNumberTournaments.value < 0 || formNumberTournaments.value > 99 || !Number.isInteger(+formNumberTournaments.value)) {
    errorNumberTournaments.style.display = "block";
    errorNumberTournaments.innerHTML = "Veuillez saisir votre nombre de tournois effectués (0 min et 99 max)";
    return false;
  } else {
    errorNumberTournaments.style.display = "none";
    errorNumberTournaments.innerHTML = "";
    return true;
  }
}

function validateLocations() {

  const errorLocation = document.getElementById("error-location");

  let btnLocationChecked = false;

  let i = 0;
  while (i < formLocations.length && !btnLocationChecked) {
    if (formLocations[i].checked) {
      btnLocationChecked = true;
    }
    i++;
  }
  if (!btnLocationChecked) {
    errorLocation.style.display = "block";
    errorLocation.innerHTML = "Veuillez saisir une ville.";
    return false;
  } else {
    errorLocation.style.display = "none";
    errorLocation.innerHTML = "";
    return true;
  }
}

// Validation of the conditions input
function validateConditions() {

  const errorConditions = document.getElementById("error-checkbox1");

  if (!formConditions.checked) {
    errorConditions.style.display = "block";
    errorConditions.innerHTML = "Vous devez acceptés les conditions d'utilisations.";
    return false;
  } else {
    errorConditions.style.display = "none";
    errorConditions.innerHTML = "";
    return true;
  }
}