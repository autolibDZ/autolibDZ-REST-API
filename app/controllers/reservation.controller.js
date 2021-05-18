const db = require('../models');
const Reservation = db.reservation;
 const createReservation = async(req, res) => {

        if (!req.body.etat || !req.body.idVehicule || !req.body.idLocataire|| !req.body.idBorneDepart|| !req.body.idBorneDestination) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        const reservation = {

            etat: req.body.etat,
            idVehicule: req.body.idVehicule,
            idLocataire: req.body. idLocataire,
            idBorneDepart: req.body. idBorneDepart,
            idBorneDestination: req.body.  idBorneDestination,
        };
       try {

           let data;
           data = await Reservation.create(reservation)
          res.send(data)

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


const findReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findAll({
            where: {
                idReservation: +req.params.id,
            },
        });
        res.status(200).send(reservation);
    } catch (err) {
        res.status(500).send({
            error:
                err.message ||
                'Some error occured while retreiving the reservtion' +
                req.params.id,
        });
    }
};


const updateReservationById= async (req, res) => {
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
                message: "Error updating Vehicule with id=" + id
            });
        });
};

const deleteReservationById  = async (req, res) => {
    const id = req.params.id;

    console.log(id);

    Reservation.destroy({
        where: { idReservation: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Reservationwas deleted successfully!"
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

export default {
    createReservation,
 listAllReservations,
  findReservationById,
    deleteReservationById,
updateReservationById,
}