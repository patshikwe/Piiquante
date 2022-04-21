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

// Liked (aimé)  *********************************
exports.likes = (req, res, next) => {
  const like = req.body.like ;
  const userId = req.body.userId;
  const sauceId = req.params.id;
  console.log("like!");
  
  Sauce.findOne({_id: sauceId})
  .then((obj) => {
    console.log(typeof obj.usersLiked);

    /*Si userId n'est pas dans usersLiked et
      like est structement égal à 1 et userId n'est pas dans usersDisliked
    */
    if (!obj.usersLiked.includes(userId) && like === 1
      && !obj.usersDisliked.includes(userId)) {
      console.log("j'aime!");
      Sauce.updateOne(
        { _id: sauceId },
        {
          $inc: { likes: 1 },
          $push: { usersLiked: userId }
        }
      )
      .then((response) => response.status(200).json({ message: "i like!" }))
      .catch((error) => res.status(400).json({ error }));
    }

    /*Si userId est dans usersLiked et 
      like est structement égal à 0 
    */
    else if (obj.usersLiked.includes(userId) && like === 0) {
      console.log("like annulé!");
      Sauce.updateOne(
        {_id: sauceId},
        { 
          $inc: {likes: -1},
          $pull: {usersLiked: userId}
        }
      )
      .then((response) => response.status(201).json({ message: "I like, canceled!"}))
      .catch((error) => res.status(400).json({ error }));
    }

    /*Si userId n'est pas dans usersDisliked et 
      like est structement égal à -1 et userId n'est pas dans usersLiked
    */
    else if (!obj.usersDisliked.includes(userId) && like === -1 
      && !obj.usersLiked.includes(userId)) {
      console.log("Dislike!");
      Sauce.updateOne(
        {_id: sauceId},
        { 
          $inc: {dislikes: 1},
          $push: {usersDisliked: userId}
        }
      )
      .then((response) => response.status(201).json({ message: "I do not like!"}))
      .catch((error) => res.status(400).json({ error }));
    }

     /*Si userId est dans usersDisliked et 
      like est structement égal à 0 
    */
    else if (obj.usersDisliked.includes(userId) && like === 0) {
      console.log("dislike annulé!");
      Sauce.updateOne(
        {_id: sauceId},
        { 
          $inc: {dislikes: -1},
          $pull: {usersDisliked: userId}
        }
      )
      .then((response) => response.status(201).json({ message: "Dislike, canceled!"}))
      .catch((error) => res.status(400).json({ error }));
    }
  })
  .catch(error => res.status(500).json({ error }));
};




