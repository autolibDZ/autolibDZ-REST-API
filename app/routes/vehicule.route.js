import vehiculeController from '../controllers/vehicules.controller.js';

var vehiculeRouter = require('express').Router();

vehiculeRouter.post('/', vehiculeController.createVehicule);

vehiculeRouter.delete('/:id', vehiculeController.deleteVehicule);

vehiculeRouter.put('/:id', vehiculeController.updateVehicule);

// vehiculeRouter.get("/:id",vehiculeController.getOneVehicule);

// GET All Vehicules
vehiculeRouter.get('/', vehiculeController.getAllVehicule);

// GET Details of a given vehicule's numero chassis
vehiculeRouter.get('/:numChassis', vehiculeController.getVehiculeDetails);

// GET Vehicules of A given agent
vehiculeRouter.get(
	'/agents/:id',
	vehiculeController.selectVehicuesOfAGivenAgent
);

// PUT the state of a given vehicule
vehiculeRouter.put('/etat/:numChassis', vehiculeController.setEtatVehicule);

// GET All vehicules which are - en service
vehiculeRouter.get('/en-service', vehiculeController.getVehiculesEnService);

// GET All vehicules which are - hors service
vehiculeRouter.get('/hors-service', vehiculeController.getVehiculesHorsService);

export default vehiculeRouter;
