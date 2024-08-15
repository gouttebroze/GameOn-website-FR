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



const checkBirthDate = (birthdate) => {
  if ((birthdate === "") || (birthdate === "mm/dd/yyyy")) {
    return false;
  } else {
    return true;
  }
}

// validation selected btn radio 
const checkRadioBtn = () => {
  for (let i = 0; i < radioBtnList.length; i++) {
    if (radioBtnList[i].checked) {
      console.log(radioBtnList[i].checked); // true
      console.log(radioBtnList[radioBtnList.length - 1]);
      radioBtnList[radioBtnList.length - 1].parentNode.removeAttribute("data-error-visible");
      radioBtnList[radioBtnList.length - 1].parentNode.removeAttribute("data-error");
      return true;
    } 
  }
  radioBtnList[radioBtnList.length - 1].parentNode.setAttribute("data-error-visible", "true") // change attribute value to true
  radioBtnList[radioBtnList.length - 1].parentNode.setAttribute("data-error", SELECT_OPTION)
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
  const formDataTag = emailTag.parentNode
  if (checkEmail(emailTag.value)) {
    formDataTag.removeAttribute("data-error-visible")
    formDataTag.removeAttribute("data-error")
  } else {
    formDataTag.setAttribute("data-error-visible", "true")
    formDataTag.setAttribute("data-error", EMAIL_FORMAT_VALID)
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
  const formDataTag = quantityTag.parentNode;
  if (checkQuantity(quantityTag.value)) {
    formDataTag.removeAttribute("data-error-visible");
    formDataTag.removeAttribute("data-error");    
  } else {
    formDataTag.setAttribute("data-error-visible", "true");
    formDataTag.setAttribute("data-error", NUMERIQUE_VALUE);
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

/**
 * form validation
 */
let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
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
     resetForm(); // use "resetForm()" fn to reset form if submit is successfull
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

document.querySelector(".close").addEventListener("click", () => {
  
})


/** TODO ** */
/*
  Close modal after form validation
*/

/**
 * See "onsubmit" : 
 *  - fn deleted from onSubmit HTML form attribut : onSubmit="return validate()"
 */