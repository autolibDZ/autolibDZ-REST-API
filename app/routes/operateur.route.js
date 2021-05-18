const express = require('express');
const router = express.Router();
const operateurControleur= require('../controllers/operateur.controller')

router.get('/', operateurControleur.findAll);
router.get('/:id', operateurControleur.findOne);
router.post('/',operateurControleur.create);
router.put("/:id", operateurControleur.update);
router.delete("/:id", operateurControleur.delete);
router.delete("/", operateurControleur.deleteAll);

module.exports = router;