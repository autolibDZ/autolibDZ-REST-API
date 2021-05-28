const express = require('express');
const router = express.Router();

import dirigeantControleur from "../controllers/dirigeant.controller";

router.get('/', dirigeantControleur.getAllDirigeants);
router.get('/:id', dirigeantControleur.getDirigeant);
router.post('/',dirigeantControleur.createDirigeant);
router.put("/:id", dirigeantControleur.updateDirigeant);
router.delete("/:id", dirigeantControleur.deleteDirigeant);
router.delete("/", dirigeantControleur.deleteAllDirigeants);

module.exports = router;