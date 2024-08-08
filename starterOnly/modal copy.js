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

/*** eventListeners ***/ 
// check firstName input value (on "change" event)
// firstName.addEventListener("change", () => {
//   console.log(firstName.value);
// })

// check if checkbox is checked
// console.log(checkbox1.checked);

// check radio buttons values
/*
for (let i = 0; i < radioBtnList.length; i++) {
  if (radioBtnList[i].checked) {
    console.log(radioBtnList[i].value);
  }
}
*/

function checkName(name) {
  if (name.value === 0) {
    name.classList.add("Veuillez entrer 2 caractères ou plus pour le champ du nom.")
  } else {
    name.classList.remove("Veuillez entrer 2 caractères ou plus pour le champ du nom.")
  }
}

/**
 * validation on form submit
 */
let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // wanna control submission

  checkName(firstNameTag);
  checkName(lastNameTag);

  //let firstNameTag = document.querySelector("#first"); // check firstName value
  // let lastNameTag = document.querySelector("#last"); // check lastName value
  // let emailTag = document.querySelector("#email"); // check lastName value
  // let birthdateTag = document.querySelector("#birthdate"); // check birthdate value
  // let quantityTag = document.querySelector("#quantity"); // check quantity value

  // let firstName = firstNameTag.value.trim();
  // let lastName = lastNameTag.value.trim();
  // let email = emailTag.value;
  // let birthdate = birthdateTag.value;
  // let quantity = quantityTag.value;

  // if (firstName.length < 2) {
  //   console.log("Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
  // } else {
  //   console.log("ok pour le champ du prénom");
  // }

  // if (firstName.length < 2) {
  //   console.log("Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  // } else {
  //   console.log("ok pour le champ du nom");
  // }

  // if (birthdateTag.value === '') {
  //   console.log("Vous devez entrer votre date de naissance.");
  // }

  // console.log(firstName, lastName, email, birthdate, quantity);
})

let firstName = firstNameTag.value.trim();
let lastName = lastNameTag.value.trim();
let email = emailTag.value;
let birthdate = birthdateTag.value;
let quantity = quantityTag.value;


/**** email ****/
