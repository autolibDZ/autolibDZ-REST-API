
import bornesCtrl from "../controllers/bornes.controller";

var router = require("express").Router();
    
// Create a new Borne
router.post("/", bornesCtrl.createBorne);
// Get bornes with filters
router.post("/filter", bornesCtrl.getFilteredBornes);

// Get all bornes in db
router.get("/all", bornesCtrl.getAllBornes);
// Get list of wilaya
router.get("/wilaya",bornesCtrl.getWilaya);
// Get list of communes by wilaya
router.get("/wilaya/:wilaya/commune",bornesCtrl.getCommune);
// Get borne by id
router.get("/:id",bornesCtrl.getBorne);
// GET all vehicles in a borne
router.get("/:id/vehicules", bornesCtrl.getVehiclesInABorne)
export default router;


