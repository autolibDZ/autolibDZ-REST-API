//const reservationRouter = require('express').Router();
//const reservationController = require('../controllers/reservation.controller');
import reservationController from "../controllers/reservation.controller";

var reservationRouter = require("express").Router();
reservationRouter.post('/', reservationController.createReservation);

reservationRouter.get( '/', reservationController.listAllReservations);

reservationRouter.get('/:id', reservationController.findReservationById);
reservationRouter.put('/:id', reservationController.updateReservationById);
reservationRouter.delete('/:id', reservationController.deleteReservationById);
module.exports=reservationRouter;
export default reservationRouter;