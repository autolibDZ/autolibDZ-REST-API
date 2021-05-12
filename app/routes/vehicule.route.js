
import vehiculeController from "../controllers/vehicules.controller.js";

var vehiculeRouter = require("express").Router();
    
// Create a new Vehicule
vehiculeRouter.post("/", vehiculeController.createVehicule);
vehiculeRouter.delete("/:id",vehiculeController.deleteVehicule); 
export default vehiculeRouter;


