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
const modalBtnClose = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const submitBtn = document.querySelector(".btn-submit");
const form = document.querySelector("form[name='reserve']");
const formFirstName = document.getElementById("first");
const formLastName = document.getElementById("last");
const formEmail = document.getElementById("email");
const formBirthdate = document.getElementById("birthdate");
const formNumberTournaments = document.getElementById("quantity");
const formLocations = document.getElementsByName("location");
const formConditions = document.getElementById("checkbox1");

// Events for opening and closing the modal 
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalBtnClose.addEventListener("click", closeModal);

// Events for the validation of the form
formFirstName.addEventListener("blur", function () { validateName("first") });
formLastName.addEventListener("blur", function () { validateName("last") });
formEmail.addEventListener("blur", function () { validateEmail() });
formBirthdate.addEventListener("blur", function () { validateBirthdate() });
formNumberTournaments.addEventListener("blur", function () { validateNumberTournaments() });
formConditions.addEventListener("change", function () { validateConditions() });

// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Close validation message
function closeValidation() {

  closeModal();

  const validationMessage = document.querySelector(".validation");
  const validationMessageBtn = document.querySelector(".btn-close");
  const confirmationContent = document.querySelector(".modal-validation");

  validationMessage.remove();
  validationMessageBtn.remove();
  confirmationContent.remove();

  formData.forEach((element) => (element.style.display = "block"));
  submitBtn.style.display = "block";

  form.reset();
}

// Validation of all the inputs in the form before the submission
function validate(event) {

  const firstNameValid = validateName("first");
  const lastNameValid = validateName("last");
  const emailValid = validateEmail();
  const birthdateValid = validateBirthdate();
  const numberTournamentValid = validateNumberTournaments();
  const locationValid = validateLocations();
  const conditionsValid = validateConditions();

  if (!firstNameValid || !lastNameValid || !emailValid || !birthdateValid || !numberTournamentValid || !locationValid || !conditionsValid) {
    return false;
  }

  showValidation();
  event.preventDefault();
}

// Validation of the first name input
function validateName(elementId) {

  const nameRegExp = new RegExp("^[a-zA-Zàâäéèêëîïìôöòûüùç,.'-]+$");
  const formName = document.getElementById(elementId);
  const index = elementId === "first" ? 0 : 1;

  if (formName.value.length < 2 || !nameRegExp.test(formName.value)) {
    formData[index].dataset.error = "Veuillez saisir au minimum 2 caractères.";
    formData[index].dataset.errorVisible = "true";
    return false;
  } else {
    delete formData[index].dataset.error;
    delete formData[index].dataset.errorVisible;
    return true;
  }

}

// Validation of the email input
function validateEmail() {

  const emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

  if (formEmail.value === "" || !emailRegExp.test(formEmail.value)) {
    formData[2].dataset.error = "Veuillez saisir une adresse e-mail valide.";
    formData[2].dataset.errorVisible = "true";
    return false;
  } else {
    delete formData[2].dataset.error;
    delete formData[2].dataset.errorVisible;
    return true;
  }
}

// Validation of the birthdate input
function validateBirthdate() {

  const today = new Date();
  const birthdate = new Date(formBirthdate.value);

  if (formBirthdate.value == "" || birthdate > today) {
    formData[3].dataset.error = "Veuillez saisir votre date de naissance valide au format JJ/MM/AAAA.";
    formData[3].dataset.errorVisible = "true";
    return false;
  } else {
    delete formData[3].dataset.error;
    delete formData[3].dataset.errorVisible;
    return true;
  }
}

// Validation of the number of tournaments input
function validateNumberTournaments() {

  if (formNumberTournaments.value === "" || formNumberTournaments.value < 0 || formNumberTournaments.value > 99 || !Number.isInteger(+formNumberTournaments.value)) {
    formData[4].dataset.error = "Veuillez saisir votre nombre de tournois effectués (0 min et 99 max)";
    formData[4].dataset.errorVisible = "true";
    return false;
  } else {
    delete formData[4].dataset.error;
    delete formData[4].dataset.errorVisible;
    return true;
  }
}

// Validation of the locations input
function validateLocations() {

  let btnLocationChecked = false;

  let i = 0;
  while (i < formLocations.length && !btnLocationChecked) {
    if (formLocations[i].checked) {
      btnLocationChecked = true;
    }
    i++;
  }
  if (!btnLocationChecked) {
    formData[5].dataset.error = "Veuillez saisir une ville.";
    formData[5].dataset.errorVisible = "true";
    return false;
  } else {
    delete formData[5].dataset.error;
    delete formData[5].dataset.errorVisible;
    return true;
  }
}

// Validation of the conditions input
function validateConditions() {

  if (!formConditions.checked) {
    formData[6].dataset.error = "Vous devez acceptés les conditions d'utilisations.";
    formData[6].dataset.errorVisible = "true";
    return false;
  } else {
    delete formData[6].dataset.error;
    delete formData[6].dataset.errorVisible;
    return true;
  }
}

// Display the validation message after the submission of the form
function showValidation() {

  formData.forEach((element) => (element.style.display = "none"));
  submitBtn.style.display = "none";

  const validationMessage = document.createElement("p");
  validationMessage.className = "validation";
  validationMessage.innerHTML = "Merci pour votre inscription.";

  const validationMessageBtn = document.createElement("button");
  validationMessageBtn.className = "btn-close";
  validationMessageBtn.innerText = "Fermer";

  const confirmationContent = document.createElement("div");
  confirmationContent.className = "modal-validation";
  confirmationContent.appendChild(validationMessage);
  confirmationContent.appendChild(validationMessageBtn);

  const modalbody = document.getElementsByClassName("modal-body");
  modalbody[0].appendChild(confirmationContent);

  const closeBtn = document.querySelector(".btn-close");
  closeBtn.addEventListener("click", closeValidation);
}