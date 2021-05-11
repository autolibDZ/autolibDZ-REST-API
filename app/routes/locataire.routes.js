module.exports = app => {
    const locataires = require("../controllers/locataire.controller");
  
    var router = require("express").Router();
  
    // Create a new Locataire
    router.post("/", locataires.create);
  
    // Retrieve all Tutorials
    router.get("/", locataires.findAll);
  
    // Retrieve a single Locataire with id
    router.get("/:id", locataires.findOne);
  
    // Update a Locataire with id
    router.put("/:id", locataires.update);
  
    // Delete a Locataire with id
    router.delete("/:id", locataires.delete);

    //Block or Unblock Locataire with id
    router.put('/block/:id', locataires.block);
    
    app.use('/locataires/', router);
  };