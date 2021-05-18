const db = require('../models');
const Trajet = db.trajet;
const createTrajet = async(req, res) => {

    if (!req.body.dateDebut || !req.body.dateFin || !req.body.tempsEstime|| !req.body.kmParcourue|| !req.body.prixAPayer|| !req.body.idReservation) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const trajet = {
        idTrajet:req.body.idTrajet,
        dateDebut: req.body.dateDebut,
        dateFin : req.body.dateFin ,
        tempsEstime: req.body.tempsEstime,
        kmParcourue: req.body.kmParcourue,
        prixAPayer: req.body.prixAPayer,
        idReservation :req.body.idReservation,
    };
    try {

        let data;
        data = await Trajet.create(trajet)
        res.send(data)

    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the Trajet."
        });
    }

};




const listAllTrajets = (req, res) => {
    var condition = 1 === 1

    Trajet.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving trajet."
            });
        });
};

const findTrajetById = async (req, res) => {
    try {
        const trajet = await Trajet.findAll({
            where: {
                idTrajet: +req.params.id,
            },
        });
        res.status(200).send(trajet);
    } catch (err) {
        res.status(500).send({
            error:
                err.message ||
                'Some error occured while retreiving the trajet' +
                req.params.id,
        });
    }
};

const updateTrajetById= async (req, res) => {
    const id = req.params.id;

    Reservation.update(req.body, {
        where: { idTrajet: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Trajet was updated successfully."
                });
            } else {
                res.send({
                        message: `Cannot update Trajet with id=${id}. Maybe Trajet was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Trajet with id=" + id
            });
        });
};

const deleteTrajetById  = async (req, res) => {
    const id = req.params.id;

    console.log(id);

    Trajet.destroy({
        where: { idTrajet: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Trajet was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Trajet with id=${id}. Maybe Trajet was not found!`
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
    createTrajet,
    listAllTrajets,
    findTrajetById,
    deleteTrajetById,
    updateTrajetById,

}