import identiteController from "../controllers/identite.controller";

var identiteRouter = require("express").Router();
    
identiteRouter.post("/", identiteController.createIdentite);
identiteRouter.delete("/:numeroPermis",identiteController.deleteIdentite); 
identiteRouter.get("/:numeroPermis",identiteController.getOneIdentite); 
identiteRouter.get("/",identiteController.getAllIdentite);

//Get information of the operator validating the identity
identiteRouter.get("/:numeroPermis/operateur",identiteController.getOperatorOfIdentity)

//Get information of the locataire
identiteRouter.get("/:numeroPermis/locataire",identiteController.getLocataireOfIdentity)

//Validate identity
identiteRouter.put("/:numeroPermis/valider",identiteController.valider)

//invalidate identity
identiteRouter.put("/:numeroPermis/invalider",identiteController.invalider)

// GET All Identities for a certain operator
identiteRouter.get('/operateur/:id',identiteController.selectIdentitiesOfAGivenOperateur);

export default identiteRouter;



