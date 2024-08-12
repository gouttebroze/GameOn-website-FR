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

// closeModal.addEventListener(("click", () => {
//   // modalbg.style.display = "none"; 
// }))


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

const SUCCES_SUBMIT = "Merci ! Votre réservation a été reçue.";
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
 * errors management with if/else conditions
 * @param {*} name 
 * @returns 
 */
// function checkName(name) {
//   if (name.length >= 2) {
//     return true;  
//   }
//   return false;
// }

function checkName(name) {
  if (name.length < 2) {
    return false
  }
  return true
}

// try {
//   checkName(firstName)
//   checkName(lastName)
// } catch(err) {
//   console.log(err);
// }

/**
 * email regexp (see more details about this regexp construction on README)
 */
function checkEmail(email) {
  let emailRegExp = new RegExp(/[a-z._-]+@[a-z._-]+\.[a-z._-]+/gm);
  if (emailRegExp.test(email)) {
    return true;
  } 
  console.log("adresse mail non valide");
  return false;
}

function checkNumeriqueValue() {
  if (Number.isInteger(quantityTag.value)) {
    return true;
  } else {
    return false;
  }
}

// think to call fn
// function isNotNumber(quantity) {
//   if (isNaN(quantityTag.value)) {
//     return false; // falsy: number
//   } else {
//     return true;
//   }
// }

function checkQuantity(totalQuantity) {
  if ((totalQuantity !== "") && (totalQuantity <= 99)) {
    return true;
  } else {
    return false;
  }
}

function checkQuantityValue() {
  const formDataTag = quantityTag.parentNode;
  if (checkQuantity(quantityTag.value)) {
    formDataTag.removeAttribute("data-error-visible");
    formDataTag.removeAttribute("data-error");    
  } else {
    formDataTag.setAttribute("data-error-visible", "true");
    formDataTag.setAttribute("data-error", NUMERIQUE_VALUE);
  }
}

function checkBirthDate(birthdate) {
  if ((birthdate === "") || (birthdate === "mm/dd/yyyy")) {
    return false;
  } else {
    return true;
  }
}

function checkBirthDateNotEmpty() {
  const formDataTag = birthdateTag.parentNode;
  if (checkBirthDate(birthdateTag.value)) {
    formDataTag.removeAttribute("data-error-visible");
    formDataTag.removeAttribute("data-error");
  } else {
    formDataTag.setAttribute("data-error-visible", "true");
    formDataTag.setAttribute("data-error", BIRTHDATE_REQUIRED);
  }
}

// validation selected btn radio 
function checkRadioBtn() {
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

function isCheckboxSelected(checkbox) {
  if (checkbox.checked) {
    return true;
  } else {
    return false;
  }
}

function checkIsCheckBoxSelected() {
  const formDataTag = checkbox1.parentNode
  if (isCheckboxSelected(checkbox1.checked)) {
    formDataTag.removeAttribute("data-error-visible");
    formDataTag.removeAttribute("data-error");
  } else {
    formDataTag.setAttribute("data-error-visible", "true");
    formDataTag.setAttribute("data-error", TERMS_CONDITIONS_AGREE);
  }
}

function checkFirstNameValid() {
  const formDataTag = firstNameTag.parentNode
  if (checkName(firstNameTag.value)) {
     formDataTag.removeAttribute("data-error-visible")
     formDataTag.removeAttribute("data-error")
  } else {   
    formDataTag.setAttribute("data-error-visible", "true")
    formDataTag.setAttribute("data-error", MIN_CHAR)
  }
}

function checkLastNameValid() {
  const formDataTag = lastNameTag.parentNode
  if (checkName(lastNameTag.value)) {
    formDataTag.removeAttribute("data-error-visible")
    formDataTag.removeAttribute("data-error")
  } else {
    formDataTag.setAttribute("data-error-visible", "true")
    formDataTag.setAttribute("data-error", MIN_CHAR)
  }
}

function checkEmailValid() {
  const formDataTag = emailTag.parentNode
  if (checkEmail(emailTag.value)) {
    formDataTag.removeAttribute("data-error-visible")
    formDataTag.removeAttribute("data-error")
  } else {
    formDataTag.setAttribute("data-error-visible", "true")
    formDataTag.setAttribute("data-error", EMAIL_FORMAT_VALID)
  }
}

/**
 * form validation
 */
let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let firstName = firstNameTag.value;
  let lastName = lastNameTag.value;
  let email = emailTag.value;
  let birthday = birthdateTag.value;
  let quantity = quantityTag.value;

  /************************************************************** 
   * NON! ces tests doivent se faire directement sur 
   * le champs concerné & non à la validation du formulaire!!! 
   * ***************************************************************/
  // checkName(lastName);
  // checkEmail(email);
  // checkRadioBtn(radioBtnList); // ok, value is login'
  checkFirstNameValid(firstName)
  checkLastNameValid(lastName)
  checkEmailValid(email)
  checkBirthDateNotEmpty(birthday)
  checkRadioBtn()
  checkQuantityValue(quantity)
  // isCheckboxSelected(checkbox1.checked)
  // checkIsCheckBoxSelected()
  
  

  /*****************************************************
   * OK CI DESSOUS on vérifie chaque champ respecte 
   * les règles pour lancer la soumission du form 
   * ***************************************************/
  if ( /*
      checkName(firstName) && 
      checkName(lastName) && 
      checkEmail(email) && 
      checkRadioBtn() && 
      checkBirthDateNotEmpty(birthday) */
      log
    ) {
     alert(SUCCES_SUBMIT);
     console.log(SUCCES_SUBMIT);
   } else {
     console.log(ERROR);
   }
})

/**** check on input field *****/
// firstNameTag.addEventListener("change", () => {
//   console.log(checkName(firstNameTag.value)); // ok, it runs, return true if valide & false if error 
// })
