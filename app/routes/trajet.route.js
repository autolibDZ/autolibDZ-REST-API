import trajetController from "../controllers/trajet.controller";

var router = require("express").Router();


router.get("/countByMonth/:year", trajetController.countTrajetsByMonth);

router.get("/getYears", trajetController.getYears);


export default router;