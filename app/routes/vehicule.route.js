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

export default vehiculesRouter;
