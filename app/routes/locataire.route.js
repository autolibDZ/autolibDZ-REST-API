import locataireController from "../controllers/locataire.controller";

var router = require("express").Router();

//Router pour la creation
router.post("/createLocataire", locataireController.createLocataire);
//Router pour retourner all locataire
router.get("/getLocataires", locataireController.findAll);
//Router pour la creation d'un locataire via gmail
router.post("/createLocataireGmail", locataireController.createLocataireGmail)

router.get("/", locataireController.findAll);
router.get("/:id", locataireController.findOne);

 router.put("/:id", locataireController.update);
  
    // Delete a Locataire with id
 router.delete("/:id", locataireController.deleteLocataire);

    //Block or Unblock Locataire with id
 router.put('/block/:id', locataireController.block);



export default router;
