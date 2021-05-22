import trajetController from "../controllers/trajet.controller";


var trajetRouter = require("express").Router();

trajetRouter.post('/', trajetController.createTrajet);

trajetRouter.get( '/', trajetController.listAllTrajets);

trajetRouter.get('/:id', trajetController.findTrajetById);
trajetRouter.put('/:id', trajetController.updateTrajetById);
trajetRouter.delete('/:id', trajetController.deleteTrajetById);
trajetRouter.get("/countByMonth/:year", trajetController.countTrajetsByMonth);
module.exports=trajetRouter;
export default trajetRouter;








