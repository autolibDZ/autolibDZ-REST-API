const db = require('../models');
const Reservation = db.reservation;





/*exports.createReservation = async (req, res) => {
    const { etat, idUtilisateur, numChassis } = req.body;
    const { rows } = await db.query(
        "INSERT INTO reservation (etat, idUtilisatuer, numChassis) VALUES ($1, $2, $3)",
        [etat,idUtilisateur, numChassis]
    );

    res.status(201).send({
        message: "Reservation added successfully!",
        body: {
            reservation: { etat, idUtilisateur, numChassis }
        },
    });*/







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


  /*  exports.listAllReservations = async (req, res) => {
        const response = await db.query('SELECT * FROM reservation ');
        res.status(200).send(response.rows);
    };*/

const listAllReservations = (req, res) => {
    var condition = 1 === 1

    reservation.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving reservation."
            });
        });
};

    /*exports.findReservationById = async (req, res) => {
        const Rid = parseInt(req.params.id);
        const response = await db.query('SELECT * FROM reservation WHERE idReservation = $1', [Rid]);
        res.status(200).send(response.rows);
    }
    exports.updateReservationById = async (req, res) => {
        const Rid = parseInt(req.params.id);
        const { etat, idUtilisateur, numChassis  } = req.body;

        const response = await db.query(
            "UPDATE reservation SET etat = $1, idUtilisateur = $2, numChassis = $3 WHERE idReservation = $4",
            [etat, idUtilisateur, numChassis, Rid]
        );

        res.status(200).send({ message: "Product Updated Successfully!" });
    };


    exports.deleteReservationById = async (req, res) => {
        const Rid = parseInt(req.params.id);
        await db.query('DELETE FROM reservation WHERE idReservation = $1', [
            Rid
        ]);

        res.status(200).send({ message: 'Product deleted successfully!', productId });
    };*/

const findReservationById = async (req, res) => {
    try {
        const reservation = await reservation.findAll({
            where: {
                idreservation: +req.params.id,
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

const updateReservationById = async (req, res) => {
    try {
        const reservation = await reservation.findByIdAndUpdate(req.params.id);
        res.status(200).json(reservation);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}
const deleteReservationById  = async (req, res) => {
    try {
        const reservation = await reservation.findByIdAndDelete(req.params.id);
        res.status(200).json(reservation);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

export default {
    createReservation,
 listAllReservations,
  findReservationById,
    deleteReservationById,
updateReservationById,
   // listAllReservations
}