import locataireController from "../controllers/locataire.controller";

var router = require("express").Router();

//Router pour la creation normal
router.post("/createLocataire", locataireController.createLocataire);
//Router pour la creation d'un locataire via gmail
router.post("/createLocataireGmail", locataireController.createLocataireGmail);
//Router pour retourner all locataire
router.get("/getLocataires", locataireController.findAll);
//Get one locataire
router.get("/:id", locataireController.findOne);
//Update locataire Email
router.put("/email/:id", locataireController.updateEmail);
//Update locataire Password
router.put("/password/:id", locataireController.updatePassword);
// Delete a Locataire with id
router.put("/delete/:id", locataireController.deleteLocataire);
//Block or Unblock Locataire with id
router.put('/block/:id', locataireController.block);
//
router.get('/validateAccount/:email', locataireController.validateAccount);



export default router;