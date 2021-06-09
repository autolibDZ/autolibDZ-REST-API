const express = require('express');
const router = express.Router();

import panneControleur from "../controllers/panne.controller";

router.get('/', panneControleur.getAllPannes);
router.get('/:id', panneControleur.getPanne);


router.get('/:id/vehicule', panneControleur.getVehiculeOfPanne);


module.exports = router;