import planMaintenanceController from '../controllers/planMaintenance.controller';

var planMaintenaceRouter = require('express').Router();

// Insert plan de maintenance for a given car for a given agent
planMaintenaceRouter.post('/', planMaintenanceController.addPlanMaintenance);

// GET plan de maintenance's car for a given agent
planMaintenaceRouter.get(
	'/:numChassis',
	planMaintenanceController.getPlanMaintenance
);

// Supprimer un plan de maintenance donné
planMaintenaceRouter.delete(
	'/:numChassis',
	planMaintenanceController.deletePlanMaintenance
);

export default planMaintenaceRouter;
