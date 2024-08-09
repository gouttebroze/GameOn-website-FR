# Projet GameOn

1. Forkez ce repo ;
2. Il est conseillé d'utiliser VisualStudio Code et vous pouvez utiliser Docker, mais ce n'est pas obligatoire ;
3. Il n'y a aucune dépendance ;
4. Vous ne devez utiliser que du CSS personnalisé et du JavaScript pur, sans jQuery, Bootstrap ou autre librairie.

## ISSUES

### TESTS MANUELS

* Visualiser et tester l'interface utilisateur dans les dernières versions de Chrome et de Firefox, ainsi que dans les versions mobile et desktop.
* Corriger les erreurs d'affichage existantes.
* Tester toutes les fonctionnalités des boutons et des entrées de formulaire (tester les valeurs correctes et incorrectes)

### Ajouter confirmation quand envoi réussi

* Après une validation réussie, inclure un message de confirmation de la soumission réussie pour l'utilisateur (ex. "Merci ! Votre réservation a été reçue.")

### Ajouter validation ou messages d'erreur

* Des messages d'erreur spécifiques doivent apparaître sous l'entrée qui n'est pas correcte. Les messages d'erreur doivent s'afficher sous le champ de saisie associé. Exemples :

  * "Veuillez entrer 2 caractères ou plus pour le champ du nom."
  * "Vous devez choisir une option."
  * "Vous devez vérifier que vous acceptez les termes et conditions."
  * "Vous devez entrer votre date de naissance."

### Implémenter entrées du formulaire

1. Lier les labels aux entrées dans le HTML en utilisant les attributs "for" et "id" dans le code existant. Corriger le code HTML quand nécessaire.

    -> **ok** attributs `for` des `label` lié aux `id` des `input`

2. Utiliser du JavaScript pur (pas de jQuery) pour terminer le formulaire :

    * Le formulaire doit être valide quand l'utilisateur clique sur "Submit"

    *formulaire valide? c'est a dire? ...valide???*
        *on ne pt valider que si ttes les regles des champs sont respectées?*

    * Les données doivent être saisies correctement :
        1. Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
        2. Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
        3. L'adresse électronique est valide.
        4. Pour le nombre de concours, une valeur numérique est saisie.
        5. Un bouton radio est sélectionné.
        6. La case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée.

    * Conserver les données du formulaire (ne pas effacer le formulaire) lorsqu'il ne passe pas la validation.

### TODO : fermer la modale

* Ajouter la fonctionnalité au bouton (x)
  * soit fermer la modale contenant le formulaire

## NOTES

### Vérifier les champs

* Pour vérifier si un champ est comforme aux règles, à la soumission :

  * écouter l’événement ``submit`` sur le formulaire

  * récupérer la valeur de ce champ

  * réaliser un test

* **Pour supprimer les espaces vides**, penser à nettoyer les champs avant de les tester. La méthode ``trim()`` permet de nettoyer le champ et de supprimer automatiquement les espaces et autres tabulations autour de la chaîne à tester.

* Penser à empêcher le comportement par défaut lors de la soumission du formulaire (évite le rechargement de la page) avec ``event.preventDefault();``.

* Pour tester le formulaire, il faut parfois bloquer les règles de validation du navigateur:

  * ajouter l'attribut `novalidate` dans la balise `form`

### RegExp Memo

* On va tester tt au long de la construction de la RegExp sur différentes adresse mail valide & on valide, sur le site [regexp101](https://regex101.com/).

* prend ttes les lettres entre a & z
    `[a-z]`
* répéter 1 fois autant que possible (prend le plus possible de lettre à chaque fois au lieu de tester lettre par lettre)
    `+`
* mais il manque les charactères spéciaux tel: `.`, `-`, `_`, `@`
donc on rajoute à notre RegExp actuelle `[a-z]+`:
    `._-`
* ce qui donne la RegExp suivante: `[a-z._-]+`

* pour l'instant seules les blocks sont sélectionnés, mais nous voulons **sélectionner l'adresse entière**, & que l'adresse sans `@` ne soit pas sélectionnée.

* donc on rajoute un `@` à la **RegExp**, soit:
    `[a-z._-]+@`
* mais la sélection s'arrête à l'`@`
* on va dupliquer le 1er block de la RegExp ce qui ns donne:
`[a-z._-]+@[a-z._-]+`

* il reste à gérer la fin type `.com`

* par contre, on ne pt pas ajouter directement un `.` à la RegExp car c'est un charactère interprété (il correspond à n'importe quel charactère), alors que nous voulons le char. spécial `.` précisément et rien d'autre, la solution, il faut l'échapper avec un **back slash**: `\`, ce qui donne:
    `[a-z._-]+@[a-z._-]+\.`
* enfin on réutilise le même block qu'au début: `[a-z._-]+`
* et voilà... ce qui ns donne au final:
  * **RegExp finale**: `/[a-z._-]+@[a-z._-]+\.[a-z._-]+/gm`

### Gestion des messages d'erreurs

* Après la vérification de la valeur d’un champ, il faut voir comment afficher les messages d'erreurs. Comment réagir lorsque un champ ne correspond pas à ce qu'on veut? (type un utilisateur oublie de renseigner son nom ou fait une erreur en écrivant son email...)

* voyons 2 méthodes pr gérer les erreurs:

  * les erreurs courantes avec les ``if / else``

  * centraliser la gestion des erreurs grâce aux exceptions ``try``, ``catch`` et ``throw``.

* Les conditions if / else pour gérer les erreurs courantes:
  * Une manière intuitive pr gérer les erreurs est d’utiliser les techniques connus tel les conditions avec les ``if / else``
  * mais cette approche va être constitué de 3 parties:
    * déclaration
    * gestion de l'erreur
    * résultat
  * ce qui manque de généricité

  * Le problème c’est que nous avons, au milieu de notre code, une partie dont l’unique but est de gérer l’erreur. Il est probable que nous ayons à nouveau besoin de gérer des erreurs dans cette suite…

  * il est plutôt conseillé de placer la gestion de l’erreur ailleurs, de manière à avoir une structure en deux temps:

        *déclaration puis résultat*

  * Concrètement, on essaie d’exécuter ce code, et en cas de problème, on appelle un bloc de code ailleurs pour gérer l’erreur.

  * Les instructions ``try / catch`` permettent de distinguer d’un côté, l'exécution “quand tout marche bien”, et de l’autre la gestion de nos erreurs.

### l’instruction throw

* ``Try`` sert à exécuter du code
* ``catch`` à attraper les erreurs
* Cela marche bien avec des erreurs JavaScript qui sont conçues pour lancer des exceptions.

* Cependant, il arrive que nous voulions créer nos propres fonctions, qui lancent une exception en cas d’échec.

* Dans ce cas, la solution est d’utiliser l’instruction ``throw`` (qu'on pt traduire par "lancer").
* Ce qui nous permet de lancer nos propres exceptions, qui pourront alors être attrapées par un ``catch``.

* Exemple pr vérifié qu'un champ nom n’est pas vide. Utilisons ``try`` / ``catch`` et ``throw`` pour gérer ces erreurs :

```js
function verifierChamp(champ) { // fonction qui prend un champ en paramètre
    // Si le champ est vide, on lance une exception crée grâce à new Error
    if (champ.value === "") {
        // je passe à cette erreur le paramètre: message d’erreur
        throw new Error(`Le champ ${champ.id} est vide`)
    }
}
```

* Attraper cette exception permet d'utiliser de ce message pour afficher n'importe quel texte.

* Le principe de ``try catch`` existe dans de nombreux langages de programmation. C’est de ce principe qu’est née l’expression “lancer une exception”, même si en réalité ici, nous lançons une “erreur”. Parfois, on parle également de “lever une exception”.

### Questions

* trouver méthode pour générer msg d'erreur directement sur le champ (il est fais en console)

* quelle méthode utiliser pr le message de confirmation de la soumission réussie?

    `confirm`?, `alert`?

* on peut utiliser l'api de validation des contraintes?

* méthode pr conserver données? localstorage?

* à voir si compris ou non!:

  * *on test les règles de validation:*

    * *directement sur le champ: pour gérer les messages d'erreurs du champ concerné (comme il est stipulé: "Les messages d'erreur doivent s'afficher sous le champ de saisie associé")*

    * *à la soumission du formulaire (sur l'évenement `submit`): pour gérer le message de validation du formulaire et donc des champs réunis*

### TODO JS

```js
// récupérer les balises html

// créer fonctions de validation des champs
function checkName(name) {
    // + placer la méthode "trim()" pr gérer les espaces vides
    if (name.length >= 2) { // si name.length >= 2 ou inverse ?     
        return true;
    } 
    // message d'erreur (méthode "alert()"?)
    alert("message d'erreur: ... mettre + de 2 char.")
    return false;
}

// fn mail valide
function emailVerifed(email) {
    // use email regexp
    let emailRegExp = new RegExp(/[a-z._-]+@[a-z._-]+\.[a-z._-]+/gm);
}

// fn champ numérique
function checkNumberType(quantity) {}

// fn validation champ date naissance rempli
function birthdateNotEmpty(birthdate) {}

// fn validation boutton radio séléctionné
function checkRadioBtnSelected(radioBtn) {}

// fn validation checkbox cochée
function checkbox1Selected(checkbox1) {}

form.addEventlistener("submit", (e) => {
    e.preventDefault()

    // validation form - message confirmation 
    if (checkName(fistName) && checkName(lastName) && emailVerifed(email)) { // & all others functions
        alert("Merci ! Votre réservation a été reçue.");
    }
})

// implémenter la persistance des textes des champs

// fermer la modal ...
```
