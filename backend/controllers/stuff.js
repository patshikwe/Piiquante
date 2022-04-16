
const Sauce = require("../models/Sauce");
const fs = require('fs');

/*createThing() est une fonction ===
  Envoyer l'objet dans la base de données
  Ici, vous créez une instance de votre modèle Thing 
  en lui passant un objet JavaScript contenant toutes 
  les informations requises du corps de requête analysé 
  (en ayant supprimé en amont le faux_id envoyé par le front-end).
  La méthode save() enregistre simplement votre Thing dans la base de données.
*/
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

/*getAllStuff() est une fonction ===
  Récupérer la liste des objets dans la base de données
  la méthode find() dans notre modèle Mongoose, 
  renvoyer un tableau contenant tous les Things dans notre base de données. 
  À présent, si vous ajoutez un Thing , 
  il doit s'afficher immédiatement sur votre page d'articles en vente.
*/
exports.getAllStuff = (req, res, next) => {
    Sauce.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ error }));
  };