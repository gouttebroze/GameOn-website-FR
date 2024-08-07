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

let checkbox1 = document.getElementById("checkbox1");
let radioBtnList = document.querySelectorAll('input[type=radio]');

/*** eventListeners ***/ 
// check firstName input value (on "change" event)
// firstName.addEventListener("change", () => {
//   console.log(firstName.value);
// })

// check checkbox value
console.log(checkbox1.checked);

// check radio buttons values
for (let i = 0; i < radioBtnList.length; i++) {
  if (radioBtnList[i].checked) {
    console.log(radioBtnList[i].value);
  }
}


let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // wanna control submission

  // check firstName input value
  let firstName = document.querySelector("#first");
  console.log(firstName.value);
})