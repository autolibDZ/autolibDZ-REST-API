import authController from "../controllers/auth.controller";

var router = require("express").Router();

//Auth locataire
router.post("/locataire/", authController.loginLocataire);
//Auth agent
router.post("/agent/", authController.loginAgent);
//Auth administrateur
router.post("/administrateur/", authController.loginAdmin);



export default router;