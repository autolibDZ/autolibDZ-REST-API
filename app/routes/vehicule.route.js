import vehiculeController from '../controllers/vehicules.controller.js';

var vehiculeRouter = require('express').Router();

vehiculeRouter.post('/', vehiculeController.createVehicule);
vehiculeRouter.delete('/:id', vehiculeController.deleteVehicule);
vehiculeRouter.put('/:id', vehiculeController.updateVehicule);

// GET Details of a given vehicule's numero chassis
vehiculeRouter.get('/:id', vehiculeController.getVehiculeDetails);

// GET All Vehicules
vehiculeRouter.get('/', vehiculeController.getAllVehicule);

// GET vehicul's reservation history
vehiculeRouter.get('/historique-reservation/:id',vehiculeController.getVehiculeReservations);

// GET Vehicules of A given agent
vehiculeRouter.get(
	'/agents/:id',
	vehiculeController.selectVehicuesOfAGivenAgent
);

// PUT the state of a given vehicule
vehiculeRouter.put('/etat/:numChassis', vehiculeController.setEtatVehicule);

// GET All vehicules which are - en service
vehiculeRouter.get(
	'/agents/:id/en-service',
	vehiculeController.getVehiculesEnServiceOfAGivenAgent
);

// GET All vehicules which are - hors service
vehiculeRouter.get(
	'/agents/:id/hors-service',
	vehiculeController.getVehiculesHorsServiceOfAGivenAgent
);

export default vehiculeRouter;
