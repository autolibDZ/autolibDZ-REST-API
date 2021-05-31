const express = require('express');
const router = express.Router();

import administrateurControleur from "../controllers/administrateur.controller";

router.get('/', administrateurControleur.getAllAdmins);
router.get('/:id', administrateurControleur.getAdmin);
router.post('/',administrateurControleur.createAdmin);
router.put("/:id", administrateurControleur.updateAdmin);
router.delete("/:id", administrateurControleur.deleteAdmin);
router.delete("/", administrateurControleur.deleteAllAdmins);

module.exports = router;