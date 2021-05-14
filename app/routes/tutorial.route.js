import tutorialsCtrl from "../controllers/tutorials.controller";

var router = require("express").Router();

// Create a new Tutorial
router.post("/", tutorialsCtrl.createTutorial);
router.get("/", tutorialsCtrl.findAll);

export default router;