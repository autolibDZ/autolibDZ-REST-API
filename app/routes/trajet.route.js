import trajetController from "../controllers/trajet.controller";

var router = require("express").Router();


router.get("/countByMonth/:year", trajetController.countTrajetsByMonth);


export default router;