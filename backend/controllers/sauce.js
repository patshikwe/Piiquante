// Fichier logique métier

const Sauce = require("../models/Sauce");
const fs = require('fs');
const { db } = require("../models/Sauce");

// Création sauce *************************
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

// Récupérer une sauce *****************
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Modifier sauce ***********************
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

// Supprimer sauce ***********************
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Récupérer toutes les sauces *****************
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ error }));
};

// Middleware pour liké (liked) ******************************
/**
 * @param {Number} like 
 * @param {string} userId
 * @param {string} sauceId
 * @param {object} usersLiked
 * @param {object} usersDisliked
 * @param $inc  incrémente un champ d'une valeur spécifiée. 
 * @param $push ajoute une valeur spécifiée à un tableau.
 * @param $pull supprime d'un tableau existant toutes les instances d'une valeur 
 * ou de valeurs qui correspondent à une condition spécifiée.
 */
exports.likes = (req, res, next) => {
  const like = req.body.like ;
  const userId = req.body.userId;
  const sauceId = req.params.id;
  
    switch (like) {
      case 1:
          Sauce.updateOne(
            { _id: sauceId },
            {
              $inc: { likes: 1 },
              $push: { usersLiked: userId },
            }
          )
            .then(() => res.status(200).json({ message: "J'aime!" }))
            .catch((error) => res.status(400).json({ error }));
        break;

      case 0:
        Sauce.findOne({ _id: sauceId })
          .then((sauce) => {
            if (sauce.usersLiked.includes(userId)) {
              Sauce.updateOne(
                { _id: sauceId },
                {
                  $inc: { likes: -1 },
                  $pull: { usersLiked: userId },
                }
              )
                .then(() =>
                  res.status(200).json({ message: "J'aime, annulé." })
                )
                .catch((error) => res.status(400).json({ error }));
            } else if (sauce.usersDisliked.includes(userId)) {
              Sauce.updateOne(
                { _id: sauceId },
                {
                  $inc: { dislikes: -1 },
                  $pull: { usersDisliked: userId },
                }
              )
                .then(() =>
                  res.status(200).json({ message: "Je n'aime pas, annulé." })
                )
                .catch((error) => res.status(400).json({ error }));
            }
          })
          .catch((error) => res.status(500).json({ error }));
        break;

      case -1:
          Sauce.updateOne(
            { _id: sauceId },
            {
              $inc: { dislikes: 1 },
              $push: { usersDisliked: userId },
            }
          )
            .then(() => res.status(200).json({ message: "Je n'aime pas!" }))
            .catch((error) => res.status(400).json({ error }));
        break;
    }
};



