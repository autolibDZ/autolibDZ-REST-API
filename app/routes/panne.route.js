const express = require('express');
const router = express.Router();

import panneControleur from "../controllers/panne.controller";

router.get('/', panneControleur.getAllPannes);
router.get('/:id', panneControleur.getPanne);
router.get('/unfixedPannes/:idAgentMaintenance', panneControleur.getUnfixedPannes)
router.get('/fixedPannes/:idAgentMaintenance', panneControleur.getFixedPannes)
router.get('/fixPanne/:idPanne', panneControleur.fixPanne)

router.get('/:idVehicule', panneControleur.getVehiculeOfPanne);


module.exports = router;