# Notes 

## A propos des features à implémenter 

### Détail dans les issues (voir repo.)

* ci-dessous, fn `successSubmit()` qui gère l'affichage & le style de la modale (& de son contenu) une fois la soumission du formulaire réussie 
* avec commentaires & notes à propos des méthodes JavaScript utilisées

```js
/**
 * fn qui lance le message de success d'envoi du formulaire
 */
function successSubmit() {
  
  const modalBody = document.querySelector(".modal-body"); /* cible la modale */

  const form = document.querySelector("form"); // cible l'élément HTML "form"
  
  modalBody.removeChild(form); // supprime "form", le noeud enfant de "modal-body"

  /* création des éléments HTML, chargés de l'affichage 
     du message de confirmation d'inscription, dans la modale,
     avec un style CSS conforme au rendu visuel qu'on retrouve sur la maquette
     nos el. HTML sont constituées: 
        - d'un élément parent représenté par une division (une balise <div>) qui englobe, 
        tel un wrapper les él. enfants constitués par:
        - 2 éléments (enfants de la div wrapper):  
          + 1 balise <h3> (contenant de msg de réussite)
          + 1 btn "Fermer" (remplaçant le btn de soumission du form), 
            (le click sur ce btn ferme la modale)
  */ 
 /**
  * méthode "insertAdjacentHTML()" 
  * permet d'insérer un noeud HTML ds le DOM en indiquant sa position
  * prend la position en 1er paramètre 
  * & un texte (string) au format HTML à inserer ds l'arbre DOM en second paramètre
  */
  modalBody.insertAdjacentHTML("afterbegin", '<div id="success-div"></div>'); 
  // création d'1 div inséré ds le DOM à la position "afterbegin", 
  // soit juste à l'intérieur de l'element "modalBody", avant son premier enfant

  // on cible la div créé via son #id et on stock cette sélection ds une variable nommée DIV
  const DIV = document.querySelector("#success-div");

  /* 
   * nous voulons créer une structure avec 
   * 1 div parent, contenant, en 1er, un titre, & en 2e, un btn 
   * 
   * En utilisant le paramètre de position "afterbegin",
   * On positionne & on insérer, à l'intérieur de notre nouvelle balise <div>, 
   * une balise <button> (représente notre btn "Fermer")
   * 
   * puis, tjrs à l'intérieur de la <div> & avant son 1er enfant (soit la balise <button>)
   * on insère une balise <h3> pr afficher notre msg de réussite,
   * 
   * ainsi notre balise <h3> se positionne en 1er, suivi de la balise <button>
  */
  DIV.insertAdjacentHTML("afterbegin", '<button class="btn-signup button success-btn close-btn">Fermer</button>'); 
  DIV.insertAdjacentHTML("afterbegin", '<h3 class="success-text">Merci pour votre inscription.</h3>');

  const closeModalBtn = document.querySelector(".close-btn");
   
  /* écoute le clic du boutton */
  closeModalBtn.addEventListener("click", closeModalFn)
}
```