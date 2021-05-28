const db = require('../models');
var bcrypt = require('bcryptjs');
const Reservation = db.reservation;
const Borne = db.borne;
const Vehicule = db.vehicules;
const Trajet = db.trajet;



const createReservation = async(req, res) => {

    if (!req.body.etat || !req.body.idVehicule || !req.body.idLocataire || !req.body.idBorneDepart || !req.body.idBorneDestination) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    var pin = Math.floor(Math.random() * 9000) + 1000;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pin.toString(), salt);
    const reservation = {

        etat: req.body.etat,
        idVehicule: req.body.idVehicule,
        idLocataire: req.body.idLocataire,
        idBorneDepart: req.body.idBorneDepart,
        idBorneDestination: req.body.idBorneDestination,
        codePin: hash
    };
    try {

        let data;
        data = await Reservation.create(reservation)
        res.status(200).send({
            codePin: pin,
            id: data.idReservation
        })

    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the reservation."
        });
    }

};



const listAllReservations = (req, res) => {
    var condition = 1 === 1

    Reservation.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving reservation."
            });
        });
};

const findReservationById = async(req, res) => {
    try {
        const reservation = await Reservation.findAll({
            where: {
                idReservation: +req.params.id,
            },
        });
        res.status(200).send(reservation);
    } catch (err) {
        res.status(500).send({
            error: err.message ||
                'Some error occured while retreiving the reservtion' +
                req.params.id,
        });
    }
};


const updateReservationById = async(req, res) => {
    const id = req.params.id;

    Reservation.update(req.body, {
        where: { idReservation: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Reservation was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Reservation with id=${id}. Maybe Reservation was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating reservation with id=" + id
            });
        });
};

const deleteReservationById = async(req, res) => {
    const id = req.params.id;

    console.log(id);

    Reservation.destroy({
        where: { idReservation: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Reservation was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Reservation with id=${id}. Maybe Reservation was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};
const selectReservationOfAGivenUser = async(req, res) => {
    try {
        const reservations = await Reservation.findAll({
            where: {
                idLocataire: +req.params.id,
            },
        });
        if (reservations.length === 0) {
            // No content with that id
            res.status(404).send({
                error: 'not_found',
                message: `No content with such id: ${+req.params.id}`,
                status: 404,
            });
        } else {
            res.status(200).send(reservations);
        }
        res.status(200).send(reservations);
    } catch (err) {
        res.status(500).send({
            error: err.message ||
                'Some error occured while retreiving reservations of this user: ' +
                req.params.id,
        });
    }
};
const getReservationAnnulee = async(req, res) => {
    try {
        const annulee = await Reservation.findAll({
            where: {
                etat: 'Annulée'
            },
        });
        if (annulee.length === 0) {

            res.status(404).send({
                error: 'not_found',
                message: `No Reservation is 'Annuled'`,
                status: 404,
            });
        } else {
            res.status(200).send(annulee);
        }
    } catch (err) {
        res.status(500).send({
            error: err.message ||
                "Some error occured while retreiving annuled reservations",
        });
    }
};


const verifyCodePin = async(req, res) => {

    const reservation = await Reservation.findOne({ where: { idVehicule: req.body.idVehicule, etat: "en cours" } })
    if (reservation != null) {
        const pinCorrect = await bcrypt.compare(req.body.codePin.toString(), reservation.codePin)
        if (pinCorrect) {
            res.status(200).send({ success: true, id: reservation })
        } else {
            res.status(400).send({ success: false })
        }
    } else {
        res.status(400).send({ success: false })
    }

}


const getHistoriqueReservationsLocataire = async(req, res) => {

    const reservations = await Reservation.findAll({ where: { idLocataire: req.params.id} })

    let historiqueReser = []


    if (reservations != null) {
        for(const reservation of reservations){
            if(reservation.etat=="Terminée"){
            let reservationFinale = {idReservation:0,etat:"", nomBorneDepart:"", nomBorneDepart:"",numChassisVehicule:0,
                numImmatriculationVehicule:0,modeleVehicule:"",marqueVehicule:"",dateReservation:0,dure:0,distance:0}

            reservationFinale.idReservation = reservation.idReservation

            reservationFinale.etat = reservation.etat

            //Recuperation nom borne de départ
            const borneDepart = await Borne.findOne({where: {idBorne: reservation.idBorneDepart}})
            reservationFinale.nomBorneDepart  = borneDepart.nomBorne
            //Recuperation nom borne de destination
            const borneDesti = await Borne.findOne({where: {idBorne: reservation.idBorneDestination}})
            reservationFinale.nomBorneDestination  = borneDesti.nomBorne
            //Recuperation des infos du véhicules
            const vehiculeInfo = await Vehicule.findOne({where: {numChassis: reservation.idVehicule}})
            if(vehiculeInfo != null){
                reservationFinale.numChassisVehicule = vehiculeInfo.numChassis
                reservationFinale.numImmatriculationVehicule = vehiculeInfo.numImmatriculation
                reservationFinale.modeleVehicule = vehiculeInfo.modele
                reservationFinale.marqueVehicule = vehiculeInfo.marque
            }
            const trajetInfo = await Trajet.findOne({where: {idReservation: reservation.idReservation}})
            if (trajetInfo != null) {
                reservationFinale.dateReservation = trajetInfo.dateDebut
                reservationFinale.dure = trajetInfo.tempsEstime
                reservationFinale.distance = trajetInfo. kmParcourue

            }
            historiqueReser.push(reservationFinale)


        }
            else{
                let reservationFinale = {idReservation:0,etat:"", nomBorneDepart:"", nomBorneDepart:"",numChassisVehicule:0,
                    numImmatriculationVehicule:0,modeleVehicule:"",marqueVehicule:""}

                reservationFinale.idReservation = reservation.idReservation

                reservationFinale.etat = reservation.etat
                //Recuperation nom borne de départ
                const borneDepart = await Borne.findOne({where: {idBorne: reservation.idBorneDepart}})
                reservationFinale.nomBorneDepart  = borneDepart.nomBorne
                //Recuperation nom borne de destination
                const borneDesti = await Borne.findOne({where: {idBorne: reservation.idBorneDestination}})
                reservationFinale.nomBorneDestination  = borneDesti.nomBorne
                //Recuperation des infos du véhicules
                const vehiculeInfo = await Vehicule.findOne({where: {numChassis: reservation.idVehicule}})
                if(vehiculeInfo != null){
                    reservationFinale.numChassisVehicule = vehiculeInfo.numChassis
                    reservationFinale.numImmatriculationVehicule = vehiculeInfo.numImmatriculation
                    reservationFinale.modeleVehicule = vehiculeInfo.modele
                    reservationFinale.marqueVehicule = vehiculeInfo.marque
                }

                historiqueReser.push(reservationFinale)

       

            }}
           
        res.status(200).send(historiqueReser)

    } else {
        res.status(404).send({ message :"This user has no reservation "})
    }
    console.log(historiqueReser)

}



export default {
    createReservation,
    listAllReservations,
    findReservationById,
    deleteReservationById,
    updateReservationById,
    verifyCodePin,
    selectReservationOfAGivenUser,
    getReservationAnnulee,
    getHistoriqueReservationsLocataire
}



