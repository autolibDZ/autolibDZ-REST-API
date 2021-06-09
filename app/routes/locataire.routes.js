/*module.exports = app => {
    const locataires = require("../controllers/locataire.controller");

    var router = require("express").Router();

    router.put('/validateAccount/:id', locataires.validateAccount);
    router.put('/block/:id', locataires.block);

    router.post("/createLocataire", locataires.createLocataire);
    router.post("/createLocataireGmail", locataires.createLocataireGmail);

    // Create a new Locataire
    /* router.post("/", locataires.create);

    // Retrieve all Tutorials
    router.get("/", locataires.findAll);

    // Retrieve a single Locataire with id
    router.get("/:id", locataires.findOne);

    // Update a Locataire with id
    router.put("/:id", locataires.update);

    // Delete a Locataire with id
    router.delete("/:id", locataires.delete);

    //Block or Unblock Locataire with id
    router.put('/block/:id', locataires.block);




    app.use('/locataires/', router);
};*/
/*
import locataireController from "../controller/locataire.controller";


var locataireRouter = require("express").Router();

locataireRouter.put('/validateAccount/:id', locataireController.validateAccount);

locataireRouter.put('/blockk/:id', locataireController.block);
/*
reservationRouter.get('/:id', reservationController.findReservationById);
reservationRouter.put('/:id', reservationController.updateReservationById);
reservationRouter.delete('/:id', reservationController.deleteReservationById);

reservationRouter.post('/verifyPin', reservationController.verifyCodePin);




reservationRouter.get('/locataires/:id', reservationController.selectReservationOfAGivenUser);
reservationRouter.get('/annulee', reservationController.getReservationAnnulee);*/
/*export default locataireRouter;*/