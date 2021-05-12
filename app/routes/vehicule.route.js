
import vehiculeController from "../controllers/vehicules.controller.js";

var router = require("express").Router();
    
// Create a new Vehicule
router.post("/", vehiculeController.createVehicule);
router.delete("/:id",vehiculeController.deleteVehicule); 
export default router;


