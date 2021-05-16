
import bornesCtrl from "../controllers/bornes.controller";

var router = require("express").Router();
    
// Create a new Borne
router.post("/", bornesCtrl.createBorne);
router.post("/filter", bornesCtrl.getFilteredBornes);
router.get("/all", bornesCtrl.getAllBornes);
router.get("/:id",bornesCtrl.getBorne);
export default router;


