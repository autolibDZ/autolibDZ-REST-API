
import vehiculeController from "../controllers/vehicules.controller.js";

var vehiculeRouter = require("express").Router();
    
// Create a new Vehicule
vehiculeRouter.post("/", vehiculeController.createVehicule);
vehiculeRouter.delete("/:id",vehiculeController.deleteVehicule); 
vehiculeRouter.put("/:id",vehiculeController.updateVehicule); 
vehiculeRouter.get("/:id",vehiculeController.getOneVehicule); 
vehiculeRouter.get("/",vehiculeController.getAllVehicule);  
export default vehiculeRouter;


