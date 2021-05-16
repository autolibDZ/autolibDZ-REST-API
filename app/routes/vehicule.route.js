import vehiculesController from '../controllers/vehicules.controller';

const vehiculesRouter = require('express').Router();

// GET All Vehicules
vehiculesRouter.get('/', vehiculesController.selectVehicues);

// GET Information about a specific vehicule
vehiculesRouter.get('/:numChassis', vehiculesController.getVehiculeDetails);

// GET All Vehicules
vehiculesRouter.get(
	'/agents/:id',
	vehiculesController.selectVehicuesOfAGivenAgent
);

// PUT the state of a given vehicule
vehiculesRouter.put('/etat/:numChassis', vehiculesController.setEtatVehicule);

// GET All vehicules which are - en service
vehiculesRouter.get('/en-service', vehiculesController.getVehiculesEnService);

// GET All vehicules which are - hors service
vehiculesRouter.get(
	'/hors-service',
	vehiculesController.getVehiculesHorsService
);

export default vehiculesRouter;
