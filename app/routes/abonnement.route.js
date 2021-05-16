
import AbonnementCtrl from "../controllers/abonnement.controller";

var router = require("express").Router();
    
// get balance
router.get("/:id", AbonnementCtrl.getUserBalance);

// do payment with carte d'abonnement
router.post("/:id", AbonnementCtrl.doPayment);

export default router;

