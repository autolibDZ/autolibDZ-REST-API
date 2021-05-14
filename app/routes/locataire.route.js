import locataireController from "../controllers/locataire.controller";

var router = require("express").Router();


router.post("/", locataireController.createLocataire);
router.get("/", locataireController.findAll);
router.get("/:id", locataireController.findOne);


export default router;