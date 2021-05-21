import reservationController from "../controllers/reservation.controller";

var reservationRouter = require("express").Router();
reservationRouter.post('/', reservationController.createReservation);

reservationRouter.get('/', reservationController.listAllReservations);

reservationRouter.get('/:id', reservationController.findReservationById);
reservationRouter.put('/:id', reservationController.updateReservationById);
reservationRouter.delete('/:id', reservationController.deleteReservationById);

reservationRouter.post('/verifyPin', reservationController.verifyCodePin);



export default reservationRouter;