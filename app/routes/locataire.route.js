import locataireController from "../controllers/locataire.controller";

var router = require("express").Router();


router.post("/createLocataire", locataireController.createLocataire);
router.get("/getLocataires", locataireController.findAll);

export default router;