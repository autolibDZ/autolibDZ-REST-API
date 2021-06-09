import trackController from "../controllers/track.controller";


var trackRouter = require("express").Router();
trackRouter.post('/start/:id_vehicule', trackController.startTracking);
trackRouter.get('/position/:id_vehicule', trackController.getPosition);
trackRouter.post('/stop/:id_vehicule', trackController.stopTracking);


export default trackRouter;