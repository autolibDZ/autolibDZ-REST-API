const express = require('express');
const router = express.Router();

import operateurControleur from "../controllers/operateur.controller";

router.get('/', operateurControleur.getAllOperateurs);
router.get('/:id', operateurControleur.getOperateur);
router.post('/',operateurControleur.createOperateur);
router.put("/:id", operateurControleur.updateOperateur);
router.delete("/:id", operateurControleur.deleteOperateur);
router.delete("/", operateurControleur.deleteAllOperateurs);

module.exports = router;