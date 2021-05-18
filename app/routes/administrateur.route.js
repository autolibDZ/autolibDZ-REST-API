const express = require('express');
const router = express.Router();
const administrateurControleur= require('../controllers/administrateur.controller')

router.get('/', administrateurControleur.findAll);
router.get('/:id', administrateurControleur.findOne);
router.post('/',administrateurControleur.create);
router.put("/:id", administrateurControleur.update);
router.delete("/:id", administrateurControleur.delete);
router.delete("/", administrateurControleur.deleteAll);

module.exports = router;