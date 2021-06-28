import reservationController from "../controllers/reservation.controller";


var reservationRouter = require("express").Router();
reservationRouter.post('/', reservationController.createReservation);

reservationRouter.get('/', reservationController.listAllReservations);

reservationRouter.get('/lesRetards', reservationController.getReservationsAvecRetard);

reservationRouter.get('/:id', reservationController.findReservationById);
reservationRouter.put('/:id', reservationController.updateReservationById);
reservationRouter.delete('/:id', reservationController.deleteReservationById);

reservationRouter.post('/verifyPin', reservationController.verifyCodePin);
reservationRouter.post('/quitterVehicule', reservationController.quitterVehicule);

reservationRouter.get('/historique/locataires/:id', reservationController.getHistoriqueReservationsLocataire);
//reservationRouter.get('/details/:id', reservationController.detailsReservation);
reservationRouter.get('/historique/all/locataires/:id', reservationController.getHistoriqueReservationsAllLocataire, );

reservationRouter.get('/locataires/:id', reservationController.selectReservationOfAGivenUser);
reservationRouter.get('/annulee', reservationController.getReservationAnnulee);
export default reservationRouter;