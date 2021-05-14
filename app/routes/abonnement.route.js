
import AbonnementCtrl from "../controllers/abonnement.controller";

var router = require("express").Router();
    
// get balance
router.get("/:id", AbonnementCtrl.getUserBalance);

export default router;

