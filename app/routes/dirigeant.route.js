const express = require('express');
const router = express.Router();
const dirigeantControleur= require('../controllers/dirigeant.controller')

router.get('/', dirigeantControleur.findAll);
router.get('/:id', dirigeantControleur.findOne);
router.post('/',dirigeantControleur.create);
router.put("/:id", dirigeantControleur.update);
router.delete("/:id", dirigeantControleur.delete);
router.delete("/", dirigeantControleur.deleteAll);

module.exports = router;