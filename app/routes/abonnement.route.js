
import AbonnementCtrl from "../controllers/abonnement.controller";

var router = require("express").Router();
   
// extract all years from dates of creation of abonnements
router.get("/getYears", AbonnementCtrl.getYears);

// get balance
router.get("/:id", AbonnementCtrl.getUserBalance);

// do payment with carte d'abonnement
router.post("/:id", AbonnementCtrl.doPayment);

// rechargez la  carte d'abonnement
router.post("/rechargez-carte-abonnement/:id", AbonnementCtrl.rechargezCarteAbonnement);

// create abonnement
router.post("/create-abonnement/:id", AbonnementCtrl.createAbonnement);

// count abonnements for every month in a specific year
router.get("/countByMonth/:year", AbonnementCtrl.countAbonnementsByMonth);

export default router;

