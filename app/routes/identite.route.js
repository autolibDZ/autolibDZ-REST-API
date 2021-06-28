import identiteController from "../controllers/identite.controller";

var identiteRouter = require("express").Router();
    
identiteRouter.post("/", identiteController.createIdentite);
identiteRouter.delete("/:id",identiteController.deleteIdentite); 
identiteRouter.get("/:id",identiteController.getOneIdentite); 
identiteRouter.get("/",identiteController.getAllIdentite);

//Get information of the operator validating the identity
identiteRouter.get("/:numeroPermis/operateur",identiteController.getOperatorOfIdentity)

//Get information of the locataire
identiteRouter.get("/:id/locataire",identiteController.getLocataireOfIdentity)

//Validate identity
identiteRouter.put("/:id/valider",identiteController.valider)

//invalidate identity
identiteRouter.put("/:id/invalider",identiteController.invalider)

// GET All Identities for a certain operator
//identiteRouter.get('/operateur/:id',identiteController.selectIdentitiesOfAGivenOperateur);

// GET All Identities for a certain locataire
identiteRouter.get('/locataire/:id',identiteController.selectIdentitieOfAGivenLocataire);

export default identiteRouter;



