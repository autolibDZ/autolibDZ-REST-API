import vehiculesController from '../controllers/vehicules.controller';

const vehiculesRouter = require('express').Router();

// Create a new Tutorial
vehiculesRouter.get('/', vehiculesController.selectVehicues);

export default vehiculesRouter;
