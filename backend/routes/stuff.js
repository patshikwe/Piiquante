// Fichier route

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const stuffCtrl = require('../controllers/stuff');


// *************** Routes *************************
/* router => appelle express avec la fonction Router
   la méthode => get;post
   stuffCtrl renvoie au fichier stuff du dossier controllers
   le point relie la fonction, la nomination de la fonction fait référence à son rôle.
*/

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createSauce);
router.get('/:id', auth, stuffCtrl.getOneSauce);
router.put('/:id', auth, multer, stuffCtrl.modifySauce);
router.delete('/:id', auth, stuffCtrl.deleteSauce);


// *************************************************

module.exports = router;