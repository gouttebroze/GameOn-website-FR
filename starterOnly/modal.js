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


function successSubmit() {
  /**
   * voir `previousSibling()` & `nextSibling()` pr viser le noeud précédent ou suivant...
   * voir `insertAdjacentHTML()` pr insérer noeud text ds DOM (méthode à privilégier à innerHTML(), voir doc.)
   * 
   * pr concerver le bouton rouge de la modal, 
   * il faut supprimer (ou masquer) tous les éléments du form 
   * à l'exeception du dernier qui est ce bouton, un <input type="button" />
   * 
   * si les éléments sont supprimés, ce qui réduit la taille de la modal, 
   * on pt facilement ajuster avec une valeur > à 200px sur le padding-top & padding-bottom 
   * de la classe "modal-body"
   * 
   * pt etre mettre 1 classe .hide (en display: none) en plus sur la modale...
   */
  // création des éléments
  //const DIV = document.createElement("div"); // div général pr contenir titre & boutton
  //const H3 = document.createElement("h3"); // création titre
  //const BTN = document.createElement("button"); // création btn "fermer"
  // création des contenus texte de la div et du boutton
  //const DIVContent = document.createTextNode("");
  //const BTNContent = document.createTextNode("");

  // le problème est que je perds tout le style lié à la modale, tel que sa taille ou le style du texte... 
  //DIV.appendChild(DIVContent); // ajoute le noeud text à la div
  //BTN.appendChild(BTNContent);


  

  //DIV
  //BTN.classList.add("btn-signup");

  const modal = document.querySelector(".content"); // ajout du nouvel élément ds le DOM
  const modalBody = document.querySelector(".modal-body");
  
  // modal.classList.add("success-content");
  //modal.insertBefore(DIV, modalBody); // ajout de la div ds la modale
  //modal.insertBefore(BTN,modalBody);

  const form = document.querySelector("form"); // cible l'élément HTML "form"
  modalBody.removeChild(form); // supprime "form", le noeud enfant de "modal-body"

  /* DIV.insertAdjacentHTML("afterbegin", '<h3>Merci pour votre inscription.</h3>');
  BTN.insertAdjacentHTML("afterbegin", '<button class="btn-signup button">Fermer.</button>');
  */
 
  modalBody.insertAdjacentHTML("afterbegin", '<div id="success-div"></div>');
  const DIV = document.querySelector("#success-div");
  DIV.insertAdjacentHTML("afterbegin", '<button class="btn-signup button success-btn close-btn">Fermer.</button>'); 
  DIV.insertAdjacentHTML("afterbegin", '<h3 class="success-text">Merci pour votre inscription.</h3>');

  const closeModalBtn = document.querySelector(".close-btn");
  /**
   * to close success modal on button click
   */
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

const SUCCESS_SUBMIT = "Merci ! Votre réservation a été reçue.";
const MIN_CHAR = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const EMAIL_FORMAT_VALID = "Veuillez entrer une adresse mail valide.";
const NUMERIQUE_VALUE = "Veuillez saisir une valeur numérique inférieure ou égale à 99 pour le nombre de concours.";
const SELECT_OPTION = "Vous devez choisir une option.";
const TERMS_CONDITIONS_AGREE = "Vous devez vérifier que vous acceptez les termes et conditions.";
const BIRTHDATE_REQUIRED = "Vous devez entrer votre date de naissance.";
const ERROR = "Erreur..."
const SUBMIT_MSG = "Merci pour votre inscription.";

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
     //alert(SUCCESS_SUBMIT);
     console.log(SUCCESS_SUBMIT);
     successSubmit();
     // TODO: change "resetForm()" to close modal fn
     resetForm(); // reset form if submit is successfull (??? SEE if I KEEP IT ???)
     // closeModalFn(); // call fn to close modal if form is validate

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