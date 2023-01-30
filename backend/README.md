## Backend

### Express / Mongoose / MongoDB

---
### *Intitulé du projet* :
### **Création d’une API sécurisée pour une application d'évaluation**
---

### *Contexte du projet* :
~~~~
Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées
secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise
souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter
leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.
~~~~

### Ma mission
~~~~
Création d'une API sécurisée.
La partie front-end est créé par un collègue avec le framework Angular.
~~~~

---
### Prérequis Backend

Vous aurez besoin d'avoir Node et `npm` installés localement sur votre machine.

## Installation

Clonez ce dépôt. Depuis le dossier "backend" du projet, exécutez `npm install` pour installer toutes les dépendances.  
Vous pouvez ensuite exécuter le serveur avec la commande `node server`.

---

### Configuration

- Mettez vos informations de cluster dans `app.js` à l'intérieur de `mongoose.connect`
- Créez le fichier `.env` dans la racine
  - Voir le modèle env_exemple pour remplir .env
- Créer un dossier nommer images dans le backend pour stocker les images
---

## Port et Routes

**Port** : 3000

### Routes

=====

**Routes pour utilisateur** :

Enregistrement d'un utilisateur

- POST : `/api/auth/signup`

Connexion

- POST : `/api/auth/login`

**Routes pour sauces** :

Création d'une sauce

- POST : `/api/sauces`

Récupération des sauces

- GET : `/api/sauces`

Récupération d'une sauce

- GET : `/api/sauces/:id`

Modification d'une sauce

- PUT : `/api/sauces/:id`

Suppression d'une sauce

- DELETE : `/api/sauces/:id`

Route pour liker

- POST : `/api/sauces/:id/like`
