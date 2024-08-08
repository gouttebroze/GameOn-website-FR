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

### ?

* on vérifie sur le champ ou sur la soumission (ou les 2)?
