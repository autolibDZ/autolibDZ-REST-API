
import vehiculeController from "../controllers/vehicules.controller.js";

var vehiculeRouter = require("express").Router();
    
vehiculeRouter.post("/", vehiculeController.createVehicule);
vehiculeRouter.delete("/:id",vehiculeController.deleteVehicule); 
vehiculeRouter.put("/:id",vehiculeController.updateVehicule); 
vehiculeRouter.get("/:id",vehiculeController.getOneVehicule); 
vehiculeRouter.get("/",vehiculeController.getAllVehicule);

// GET All Vehicules for a certain agent
vehiculeRouter.get('/agents/:id',vehiculeController.selectVehicuesOfAGivenAgent);

export default vehiculeRouter;



