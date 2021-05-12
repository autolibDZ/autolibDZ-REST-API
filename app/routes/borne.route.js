
import bornesCtrl from "../controllers/bornes.controller";

var router = require("express").Router();
    
// Create a new Borne
router.post("/", bornesCtrl.createBorne);
router.post("/filter", bornesCtrl.listBorne);
router.get("/:id",bornesCtrl.oneBorne);
export default router;


