module.exports = app => {
    const locataires = require("../controllers/locataire.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", locataires.create);
  
    // Retrieve all Tutorials
    router.get("/", locataires.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", locataires.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", locataires.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", locataires.delete);

    app.use('/locataires/', router);
  };