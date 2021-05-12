import locataireController from "../controllers/locataire.controller";

var router = require("express").Router();


router.post("/", locataireController.createLocataire);
router.get("/", locataireController.findAll);

export default router;