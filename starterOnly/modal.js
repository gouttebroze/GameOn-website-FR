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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModalFn() {
  modalbg.style.display = "none";
}

// close modal on click arrow btn 
closeModal.addEventListener("click", closeModalFn)

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

const SUCCESS_SUBMIT = "Merci ! Votre réservation a été reçue.";
const MIN_CHAR = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const EMAIL_FORMAT_VALID = "Veuillez entrer une adresse mail valide.";
const NUMERIQUE_VALUE = "Veuillez saisir une valeur numérique inférieure ou égale à 99 pour le nombre de concours.";
const SELECT_OPTION = "Vous devez choisir une option.";
const TERMS_CONDITIONS_AGREE = "Vous devez vérifier que vous acceptez les termes et conditions.";
const BIRTHDATE_REQUIRED = "Vous devez entrer votre date de naissance.";
const ERROR = "Erreur..."

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
  if ((totalQuantity !== "") && (totalQuantity <= 99)) { // ? if (isNaN(quantityTag.value))
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
      // radioBtnList[radioBtnList.length - 1].parentNode.removeAttribute("data-error-visible");
      // radioBtnList[radioBtnList.length - 1].parentNode.removeAttribute("data-error");
      return true;
    } 
  }
  // radioBtnList[radioBtnList.length - 1].parentNode.setAttribute("data-error-visible", "true") // change attribute value to true
  // radioBtnList[radioBtnList.length - 1].parentNode.setAttribute("data-error", SELECT_OPTION)
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

// const checkFirstNameValid = () => {
//   const formDataTag = firstNameTag.parentNode
//   if (checkName(firstNameTag.value)) {
//      formDataTag.removeAttribute("data-error-visible")
//      formDataTag.removeAttribute("data-error")
//   } else {   
//     formDataTag.setAttribute("data-error-visible", "true")
//     formDataTag.setAttribute("data-error", MIN_CHAR)
//   }
// }

const checkFirstNameValid = () => {
  if (checkName(firstNameTag.value)) {
     deleteErrorMsg(firstNameTag)
  } else {   
    setErrorMsg(firstNameTag, MIN_CHAR)
  }
}

// const checkLastNameValid = () => {
//   const formDataTag = lastNameTag.parentNode
//   if (checkName(lastNameTag.value)) {
//     formDataTag.removeAttribute("data-error-visible")
//     formDataTag.removeAttribute("data-error")
//   } else {
//     formDataTag.setAttribute("data-error-visible", "true")
//     formDataTag.setAttribute("data-error", MIN_CHAR)
//   }
// }

const checkLastNameValid = () => {
  if (checkName(lastNameTag.value)) {
    deleteErrorMsg(lastNameTag)
  } else {
    setErrorMsg(lastNameTag, MIN_CHAR)
  }
}

const checkEmailValid = () => {
  // const formDataTag = emailTag.parentNode
  if (checkEmail(emailTag.value)) {
    deleteErrorMsg(emailTag);
    // formDataTag.removeAttribute("data-error-visible")
    // formDataTag.removeAttribute("data-error")
  } else {
    setErrorMsg(emailTag, EMAIL_FORMAT_VALID);
    // formDataTag.setAttribute("data-error-visible", "true")
    // formDataTag.setAttribute("data-error", EMAIL_FORMAT_VALID)
  }
}

const checkBirthDateNotEmpty = () => {
  // const formDataTag = birthdateTag.parentNode;
  if (checkBirthDate(birthdateTag.value)) {
    deleteErrorMsg(birthdateTag);
    // formDataTag.removeAttribute("data-error-visible");
    // formDataTag.removeAttribute("data-error");
  } else {
    setErrorMsg(birthdateTag, BIRTHDATE_REQUIRED);
    // formDataTag.setAttribute("data-error-visible", "true");
    // formDataTag.setAttribute("data-error", BIRTHDATE_REQUIRED);
  }
}

const checkQuantityValue = () => {
  // const formDataTag = quantityTag.parentNode;
  if (checkQuantity(quantityTag.value)) {
    deleteErrorMsg(quantityTag);
    // formDataTag.removeAttribute("data-error-visible");
    // formDataTag.removeAttribute("data-error");    
  } else {
    setErrorMsg(quantityTag, NUMERIQUE_VALUE);
    // formDataTag.setAttribute("data-error-visible", "true");
    // formDataTag.setAttribute("data-error", NUMERIQUE_VALUE);
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

// listen on "submit" event on HTML form
form.addEventListener("submit", (e) => {

  /**
   * as we don't want to reload page on submit HTML form, 
   * we use the "preventDefault()" fn on submit event (called here "e") 
   * to prevent submit form default comportement (that is to reload page)
   */
  e.preventDefault();
  
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
     alert(SUCCESS_SUBMIT);
     console.log(SUCCESS_SUBMIT);

     // TODO: change "resetForm()" to close modal fn
     resetForm(); // reset form if submit is successfull (??? SEE if I KEEP IT ???)
     closeModalFn(); // call fn to close modal if form is validate

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
  document.querySelector("form").reset();
}

function deleteErrorMsg(tag) {
  const formDataTag = tag.parentNode;
  formDataTag.removeAttribute("data-error-visible");
  formDataTag.removeAttribute("data-error");
}

function setErrorMsg(tag, msg) {
  const formDataTag = tag.parentNode;
  formDataTag.setAttribute("data-error-visible", "true")
  formDataTag.setAttribute("data-error", msg)
}

/** TODO ** */
/*
  - use "deleteErrorMsg()" & "setErrorMsg()" on every fn
*/

/**
 * See "onsubmit" : 
 *  - fn deleted from onSubmit HTML form attribut : onSubmit="return validate()"
 */