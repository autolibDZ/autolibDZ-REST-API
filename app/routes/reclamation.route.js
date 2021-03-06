import reclamationController from '../controllers/reclamation.controller.js';

var reclamationRouter = require('express').Router();

// GET Years of bugs
reclamationRouter.get("/getYears", reclamationController.getYears);

// GET Bugs By Month
reclamationRouter.get("/countByMonth/:year", reclamationController.countBugsByMonth);

// POST to create a claim
reclamationRouter.post('/:idLocataire', reclamationController.createReclamation);

// DELETE to delete a claim with  a specific ID 
reclamationRouter.delete('/:id', reclamationController.deleteReclamation);

// GET Details of a given reclamation' that had the id in the request 
reclamationRouter.get('/:id', reclamationController.getReclamationDetails);

// GET All Claims 
reclamationRouter.get('/', reclamationController.getAllReclamations);

export default reclamationRouter;
