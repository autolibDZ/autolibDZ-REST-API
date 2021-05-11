const express = require('express');
const router = express.Router();
const controleur= require('../controllers/employe.controller')

router.get('/', controleur.findAll);
router.get('/:id', controleur.findOne);
router.post('/',controleur.create);
router.put("/:id", controleur.update);
router.delete("/:id", controleur.delete);
router.delete("/", controleur.deleteAll);

module.exports = router;