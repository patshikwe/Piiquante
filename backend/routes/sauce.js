// Fichier route

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const sauceCtrl = require('../controllers/sauce');


// *************** Routes *************************
/* router => appelle express avec la fonction Router
   la méthode => get;post
   sauceCtrl renvoie au dossier controllers/sauce.js
   le point relie la fonction, la nomination de la fonction fait référence à son rôle.
*/

router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like',auth, sauceCtrl.likes);





// *************************************************

module.exports = router;