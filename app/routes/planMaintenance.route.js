import planMaintenanceController from '../controllers/planMaintenance.controller';

var planMaintenaceRouter = require('express').Router();

planMaintenaceRouter.post('/', planMaintenanceController.addPlanMaintenance);

export default planMaintenaceRouter;
