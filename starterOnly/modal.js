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
const formData = document.querySelectorAll(".formData");
const closeModal = document.querySelector(".close");
const successDiv = document.querySelector("#success-div");
const modalBody = document.querySelector(".modal-body");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  form.style.display = "block";
}


function closeModalFn() {
  modalbg.style.display = "none";
  location.reload();
}

// close modal on click arrow btn 
closeModal.addEventListener("click", closeModalFn)

/* function exitSuccessModal() {
  modalbg.style.display = "none";
} */

function successSubmit() {
  const modalBody = document.querySelector(".modal-body");
  const form = document.querySelector("form");

  form.style.display = "none"; 

  modalBody.insertAdjacentHTML("afterbegin", '<div id="success-div"></div>'); 

  const successContentTag = document.querySelector("#success-div");
  
  successContentTag.insertAdjacentHTML("afterbegin", '<button class="btn-signup button success-btn close-btn">Fermer</button>'); 
  successContentTag.insertAdjacentHTML("afterbegin", '<h3 class="success-text">Merci pour votre inscription.</h3>');

  const closeModalBtn = document.querySelector(".close-btn");
  closeModalBtn.addEventListener("click", closeModalFn)
}

/******************************
 *  check inputs form values 
 ******************************/
let firstNameTag = document.querySelector("#first"); 
let lastNameTag = document.querySelector("#last"); 
let emailTag = document.querySelector("#email"); 
let birthdateTag = document.querySelector("#birthdate"); 
let quantityTag = document.querySelector("#quantity"); 
let checkbox1 = document.getElementById("checkbox1");

let radioBtnList = document.querySelectorAll('input[type=radio]');

/* MESSAGES TEXT CONTENT */
const SUCCESS_SUBMIT = "Merci ! Votre réservation a été reçue.";
const MIN_CHAR = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const EMAIL_FORMAT_VALID = "Veuillez entrer une adresse mail valide.";
const NUMERIQUE_VALUE = "Veuillez saisir une valeur numérique inférieure ou égale à 99 pour le nombre de concours.";
const SELECT_OPTION = "Vous devez choisir une option.";
const TERMS_CONDITIONS_AGREE = "Vous devez vérifier que vous acceptez les termes et conditions.";
const BIRTHDATE_REQUIRED = "Vous devez entrer votre date de naissance.";
const ERROR = "Erreur..."
const SUBMIT_MSG = "Merci pour votre inscription.";

/* INPUT VALUES */
let firstName = firstNameTag.value;
let lastName = lastNameTag.value;
let email = emailTag.value;
let quantity = quantityTag.value;

/**
 * firstName & lastName field form
 * fn that check if "name" length is higher or equal to 2 characters
 * @param {string} name 
 * @returns 
 */
const checkName = (name) => {
  if (name.length < 2) {
    return false
  }
  return true
}

/**
 * email regexp (see more details about this regexp construction on README)
 */
const checkEmail = (email) => {
  let emailRegExp = new RegExp(/[a-z._-]+@[a-z._-]+\.[a-z._-]+/gm);
  if (emailRegExp.test(email)) {
    return true;
  } 
  console.log("adresse mail non valide");
  return false;
}

/**
 * fn that check if numbers of tournaments is lower or equals to 99
 * @param {number} totalQuantity 
 * @returns 
 */
const checkQuantity = (totalQuantity) => {
  if ((totalQuantity !== "") && (totalQuantity <= 99)) { 
    return true;
  } else {
    return false;
  }
}

/**
 * fn that check if bithdate field is empty or not & if have good Date format
 * @param {Date} birthdate 
 * @returns 
 */
const checkBirthDate = (birthdate) => {
  if ((birthdate === "") || (birthdate === "mm/dd/yyyy")) {
    return false;
  } else {
    return true;
  }
}

/**
 * check if one or more radio btn are selected
 * @returns
 */ 
const checkRadioBtn = () => {
  for (let i = 0; i < radioBtnList.length; i++) {
    if (radioBtnList[i].checked) {
      deleteErrorMsg(radioBtnList[radioBtnList.length - 1]);
      return true;
    } 
  }
  setErrorMsg(radioBtnList[radioBtnList.length - 1], SELECT_OPTION);
  return false;
}

/**
 * fn that check if "terms & conditions" checkbox is checked or not
 * @param {boolean} checkbox 
 * @returns 
 */
const isCheckboxSelected = (checkbox) => {
  if (!checkbox.checked) {
    console.log("Les conditions doivent être acceptés.");
    return false;
  } else {
    return true;
  }
}

const checkFirstNameValid = () => {
  if (checkName(firstNameTag.value)) {
     deleteErrorMsg(firstNameTag)
  } else {   
    setErrorMsg(firstNameTag, MIN_CHAR)
  }
}

/**
 * @returns fn de suppression et fn de création du msg d'erreur
 */
const checkLastNameValid = () => {
  if (checkName(lastNameTag.value)) {
    deleteErrorMsg(lastNameTag)
  } else {
    setErrorMsg(lastNameTag, MIN_CHAR)
  }
}

const checkEmailValid = () => {
  if (checkEmail(emailTag.value)) {
    deleteErrorMsg(emailTag);
  } else {
    setErrorMsg(emailTag, EMAIL_FORMAT_VALID);
  }
}

const checkBirthDateNotEmpty = () => {
  if (checkBirthDate(birthdateTag.value)) {
    deleteErrorMsg(birthdateTag);
  } else {
    setErrorMsg(birthdateTag, BIRTHDATE_REQUIRED);
  }
}

const checkQuantityValue = () => {
  if (checkQuantity(quantityTag.value)) {
    deleteErrorMsg(quantityTag);
  } else {
    setErrorMsg(quantityTag, NUMERIQUE_VALUE);
  }
}

const checkTermsConditions = () => {
  if (checkbox1.checked) {
    deleteErrorMsg(checkbox1);
    return true;
  } else {
    console.log(TERMS_CONDITIONS_AGREE);
    setErrorMsg(checkbox1, TERMS_CONDITIONS_AGREE);
    return false;
  }
}

/*******************
 * form validation
 *******************/
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {

  e.preventDefault();
  
  console.log(e);

  const firstNameValue = firstNameTag.value;
  const lastNameValue = lastNameTag.value;
  const emailValue = emailTag.value;
  const birthdayValue = birthdateTag.value;
  const quantityValue = quantityTag.value;

  checkFirstNameValid(firstNameValue)
  checkLastNameValid(lastNameValue)
  checkEmailValid(emailValue)
  checkBirthDateNotEmpty(birthdayValue)
  checkQuantityValue(quantityValue)
  checkRadioBtn()
  checkTermsConditions()

  /************************************************************** 
   * confirm submit success form
   **************************************************************/
  if (checkName(firstNameValue) 
      && checkName(lastNameValue) 
      && checkEmail(emailValue) 
      && checkBirthDate(birthdayValue) 
      && checkQuantity(quantityValue)
      && checkRadioBtn() 
      && checkTermsConditions()
    ) {   
     successSubmit();
     resetForm();
     return true;
   }
   console.log(ERROR);
   return false;
  }
)

/**
 * fn that reset form
 */
const resetForm = () => {
  form.reset()
  
}

/**
 * @param {string} tag - Tag
 */
function deleteErrorMsg(tag) {
  const formDataTag = tag.parentNode;
  formDataTag.removeAttribute("data-error-visible");
  formDataTag.removeAttribute("data-error");
}

/**
 * @param {string} tag - Tag is a reference to a node, into the form,
 * @param {string} msg - Msg is the error text content message
 */
function setErrorMsg(tag, msg) {
  const formDataTag = tag.parentNode;
  formDataTag.setAttribute("data-error-visible", "true"); 
  formDataTag.setAttribute("data-error", msg); 
}
