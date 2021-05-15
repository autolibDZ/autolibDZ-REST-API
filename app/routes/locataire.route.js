import locataireController from "../controllers/locataire.controller";

var router = require("express").Router();

//Router pour la creation
router.post("/createLocataire", locataireController.createLocataire);
//Router pour retourner all locataire
router.get("/getLocataires", locataireController.findAll);
//Router pour la creation d'un locataire via gmail
router.post("/createLocataireGmail", locataireController.createLocataireGmail)


export default router;