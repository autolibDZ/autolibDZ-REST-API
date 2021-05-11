import vehiculesController from '../controllers/vehicules.controller';

const vehiculesRouter = require('express').Router();

// GET All Vehicules
vehiculesRouter.get('/', vehiculesController.selectVehicues);

// GET All Vehicules
vehiculesRouter.get(
	'/agents/:id',
	vehiculesController.selectVehicuesOfAGivenAgent
);

export default vehiculesRouter;
