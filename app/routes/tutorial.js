
    import tutorialsCtrl from "../controllers/tutorial";
    var router = require("express").Router();
    
    
    
     // Create a new Tutorial
     router.post("/", tutorialsCtrl.createTutorial);



     export default router;


