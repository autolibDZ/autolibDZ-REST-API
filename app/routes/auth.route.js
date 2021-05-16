import authController from "../controllers/auth.controller";

var router = require("express").Router();


router.post("/locataire/", authController.loginLocataire);
router.post("/agant/", authController.loginAgent);
router.post("/administrateur/", authController.loginAdmin);



export default router;