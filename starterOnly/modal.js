function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements

// ci-dessous, on cible une balise <div> du HTML ayant la classe "bground" 
// & on stock cette sélection de balise dans une variable (de type constante, elle ne pourra être modifié) nommée "modalbg"
// ce qui ns permet de réutiliser notre balise ciblé facilement & simplement
const modalbg = document.querySelector(".bground"); 
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const closeModal = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
/**
 * fn lance la modale du formulaire
 */
function launchModal() {
  modalbg.style.display = "block";
}

/* 
 * la modale est ouverte ou fermée selon la valeur affectée 
 * à la propriété "display" ("block" ouvre, "none" ferme)
*/

/**
 * fn entraîne la fermeture de la modale
 */
function closeModalFn() {
  modalbg.style.display = "none";
}

// close modal on click arrow btn 
closeModal.addEventListener("click", closeModalFn)

/**
 * fn qui lance le message de success d'envoi du formulaire
 */
function successSubmit() {
  
  const modalBody = document.querySelector(".modal-body"); /* cible la modale */
  const form = document.querySelector("form"); // cible l'élément HTML "form"
  modalBody.removeChild(form); // supprime "form", le noeud enfant de "modal-body"
 
  modalBody.insertAdjacentHTML("afterbegin", '<div id="success-div"></div>'); 
  // création d'1 div inséré ds le DOM à la position "afterbegin", 
  // soit juste à l'intérieur de l'element "modalBody", avant son premier enfant

  // on cible la div créé via son #id et on stock cette sélection ds une variable nommée DIV
  const DIV = document.querySelector("#success-div");

  /* 
   * En utilisant le paramètre de position "afterbegin",
   * On positionne & on insérer, à l'intérieur de notre nouvelle balise <div>, 
   * une balise <button> (représente notre btn "Fermer")
   * puis, tjrs à l'intérieur de la <div> & avant son 1er enfant (soit la balise <button>)
   * on insère une balise <h3> pr afficher notre msg de réussite,
   * ainsi notre balise <h3> se positionne en 1er, suivi de la balise <button>
  */
  DIV.insertAdjacentHTML("afterbegin", '<button class="btn-signup button success-btn close-btn">Fermer</button>'); 
  DIV.insertAdjacentHTML("afterbegin", '<h3 class="success-text">Merci pour votre inscription.</h3>');

  // on cible le btn qu'on vient de créer
  const closeModalBtn = document.querySelector(".close-btn");
   
  /* au clic sur le btn, on lance la fn "closeModalFn" qui ferme la modale, 
     en modifiant la valeur de la propriété "display", de "block" à "none" 
  */
  closeModalBtn.addEventListener("click", closeModalFn)
}

/******************************
 *  check inputs form values 
 ******************************/
// on vise les balises du formulaire qu'on stock ds différentes variables
let firstNameTag = document.querySelector("#first"); 
let lastNameTag = document.querySelector("#last"); 
let emailTag = document.querySelector("#email"); 
let birthdateTag = document.querySelector("#birthdate"); 
let quantityTag = document.querySelector("#quantity"); 
let checkbox1 = document.getElementById("checkbox1");

// on vise plusieurs balises, ici les <input> type radio, (ou radio-btn)
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

const checkFirstNameValid = () => {
  if (checkName(firstNameTag.value)) {
     deleteErrorMsg(firstNameTag)
  } else {   
    setErrorMsg(firstNameTag, MIN_CHAR)
  }
}

/**
 * fn qui utilise une fn en condition créée précédament 
 * pr vérifier le respect de règle (2 char. min.), avec en paramètre la valeur de l'input
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

     console.log(SUCCESS_SUBMIT);
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
  document.querySelector("form").reset();
}

/**
 * @param {string} tag - Tag
 */
function deleteErrorMsg(tag) {
  const formDataTag = tag.parentNode; // "parentNode" renvoie le parent du noeud spécifié, soit le parent du paramètre "tag"
  formDataTag.removeAttribute("data-error-visible");
  formDataTag.removeAttribute("data-error");
}

/**
 * @param {string} tag - Tag is a reference to a node, into the form,
 * @param {string} msg - Msg is the error text content message
 */
function setErrorMsg(tag, msg) {
  const formDataTag = tag.parentNode; // cible le parent du noeud représenté par la variale "tag"
  
 // change la valeur de l'attribut
  formDataTag.setAttribute("data-error-visible", "true"); 
  formDataTag.setAttribute("data-error", msg); 
}
