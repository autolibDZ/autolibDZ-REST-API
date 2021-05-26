const db = require('../models');
var bcrypt = require('bcryptjs');
const Reservation = db.reservation;




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
        idLocataire: req.body. idLocataire,
        idBorneDepart: req.body. idBorneDepart,
        idBorneDestination: req.body.  idBorneDestination,
        tempsEstime: req.body.tempsEstime,
        distanceEstime: req.body.distanceEstime,
        prixEstime: req.body.prixEstime,
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
            console.log(data)
            res.send({ "etat": data[0].etat})

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

};

export default {
    createReservation,
    listAllReservations,
    findReservationById,
    deleteReservationById,
    updateReservationById,
    verifyCodePin,
    selectReservationOfAGivenUser,
    getReservationAnnulee
}