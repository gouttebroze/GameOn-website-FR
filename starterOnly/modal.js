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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
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

/*******************
 *** Constants 
 *******************/
const SUCCES_SUBMIT = "Merci ! Votre réservation a été reçue.";
const MIN_CHAR = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const SELECT_OPTION = "Vous devez choisir une option.";
const CHECKBOX_REQUIRED = "Vous devez vérifier que vous acceptez les termes et conditions.";
const BIRTHDATE_REQUIRED = "Vous devez entrer votre date de naissance.";
const ERROR = "Erreur..."

// et l'utilisation de "minlength" du coup ds tt ça?
let firstName = firstNameTag.value;
let lastName = lastNameTag.value;
let email = emailTag.value;

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

/**
 * use try/catch/throw allow to centralized errors management
 * @param {*} name 
 */
function checkName(name) {
  if (name.length < 2) {
    throw new Error(`Veuillez entrer 2 caractères ou plus sur le champ ${name}.`)
  }
}

try {
  checkName(firstName)
  checkName(lastName)
} catch(err) {
  console.log(err);
}

/**
 * email regexp (see more details about this regexp construction on README)
 */

function checkEmail(email) {
  let emailRegExp = new RegExp("/[a-z._-]+@[a-z._-]+\.[a-z._-]+/gm");
  if (emailRegExp.test(email)) {
    return true;
  }
  return false;
}

// validation selected btn radio 
function checkRadioBtnSelected(radioBtnList) {
  for (let i = 0; i < radioBtnList.length; i++) {
    if (radioBtnList[i].checked) {
      console.log(radioBtnList[i].value);
    }
  }
}


/**
 * validation on form submit
 */
let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // wanna control submission

  let firstName = firstNameTag.value;
  let lastName = lastNameTag.value;
  let email = emailTag.value;
  // checkName(firstName);
  // checkName(lastName);
  // checkEmail(email);
  checkRadioBtnSelected(radioBtnList); // ok, value is login'

  if (checkName(firstName) && checkName(lastName) && checkEmail(email)) {
    alert(SUCCES_SUBMIT);
    console.log(SUCCES_SUBMIT);
  } else {
    console.log(ERROR);
  }

})

/**** check on input field *****/
firstNameTag.addEventListener("change", () => {
  console.log(checkName(firstNameTag.value)); // ok, it runs, return true if valide & false if error 
})



/************************************************
 ************* TODO from README ***************** 
 ************************************************/
// récupérer les balises html

// créer fonctions de validation des champs
// function checkName(name) {
//     // + placer la méthode "trim()" pr gérer les espaces vides
//     if (name.length >= 2) { // si name.length >= 2 ou inverse ?     
//         return true;
//     } 
//     // message d'erreur (méthode "alert()"?)
//     alert("message d'erreur: ... mettre + de 2 char.")
//     return false;
// }

// // fn mail valide
// function emailVerifed(email) {
//     // use email regexp
//     let emailRegExp = new RegExp(/[a-z._-]+@[a-z._-]+\.[a-z._-]+/gm);
// }

// // fn champ numérique
// function checkNumberType(quantity) {}

// // fn validation champ date naissance rempli
// function birthdateNotEmpty(birthdate) {}

// // fn validation boutton radio séléctionné
// function checkRadioBtnSelected(radioBtn) {}

// // fn validation checkbox cochée
// function checkbox1Selected(checkbox1) {}

// form.addEventlistener("submit", (e) => {
//     e.preventDefault()

//     // validation form - message confirmation 
//     if (checkName(fistName) && checkName(lastName) && emailVerifed(email)) { // & all others functions
//         alert("Merci ! Votre réservation a été reçue.");
//     }
// })

// implémenter la persistance des textes des champs

// fermer la modal ...