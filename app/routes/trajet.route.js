import trajetController from "../controllers/trajet.controller";


var trajetRouter = require("express").Router();

trajetRouter.get("/countByMonth/:year", trajetController.countTrajetsByMonth);
trajetRouter.get("/getYears", trajetController.getYears);
trajetRouter.post('/', trajetController.createTrajet);
trajetRouter.post('/createDebutTrajet', trajetController.createDebutTrajet);
trajetRouter.put('/updateFinTrajet', trajetController.updateFinTrajet);

trajetRouter.get('/', trajetController.listAllTrajets);
trajetRouter.get('/getTrajetByReservation/:id', trajetController.getTrajetByResrvation);

trajetRouter.get('/:id', trajetController.findTrajetById);
trajetRouter.put('/:id', trajetController.updateTrajetById);
trajetRouter.delete('/:id', trajetController.deleteTrajetById);


export default trajetRouter;
