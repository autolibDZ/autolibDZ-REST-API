const db = require('../models');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

const Reservation = db.reservation;
const Borne = db.borne;
const Locataire = db.locataire;
const Vehicule = db.vehicules;
const Trajet = db.trajet;



/**
 * Create and save a new reservation in database
 * @param {*} req The request
 * @param {*} res The response
 * @returns {object} The reservation that created
 */

// La creation d'une reservation et la modification du valeur nbVehicules dans la borne choisie
const createReservation = async(req, res) => {
    // verify access
    //Quand le locataire est connecter on lui genere un session (jwt)
    //On lit la valeur de l'authorization header qui est sous le format Bearer + Token
   const authHeader = req.headers['authorization']
    //On recupere le token
    const token = authHeader && authHeader.split(' ')[1]


    if (token == null) {

      res.status(403).send({
        message: "Access Forbidden,invalide token",
      });
      return;
    }

    try {
// La verification de l'identité
      const user = jwt.verify(token, process.env.JWT_SECRET);

      if (user != undefined) {
//on recupere le role du user
        const role = user.role



        if (role != "locataire") {

          res.status(403).send({
            message: "Access Forbidden,you can't do this operation",
          });

          return;
        }
      }

    } catch (err) {

      res.status(403).send({
        message: "Access Forbidden,invalide token",
      });

      return;

    }


//On verifie que les valeurs de la requete ne sont pas a null
    if (!req.body.etat || !req.body.idVehicule || !req.body.idLocataire || !req.body.idBorneDepart || !req.body.idBorneDestination) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
// la genereation d'un code pin hashé
    var pin = Math.floor(Math.random() * 9000) + 1000;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pin.toString(), salt);
    const reservation = {

        etat: req.body.etat,
        idVehicule: req.body.idVehicule,
        idLocataire: req.body.idLocataire,
        idBorneDepart: req.body.idBorneDepart,
        idBorneDestination: req.body.idBorneDestination,
        codePin: hash,
        tempsEstime: req.body.tempsEstime,
        distanceEstime: req.body.distanceEstime,
        prixEstime: req.body.prixEstime,
    };
    try {
//La creation d'une reservation
        let data;
        data = await Reservation.create(reservation)
        res.status(200).send({
            codePin: pin,
            id: data.idReservation

        })
//On recupere la borne de depart
        const bornes = await Borne.findAll({ where: { idBorne: req.body.idBorneDepart} })



        if (bornes != null) {
            //le nombre de vehicules dans la borne -1
            for (const born of bornes) {
                let nb=born.nbVehicules
                nb= nb-1

                Borne.update(
                    { nbVehicules: nb },
                    {
                        returning: true,
                        where: {
                            idBorne: req.body.idBorneDepart
                        },

                    } )

            }
        }

    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the reservation."
        });
    }

};

/**
 *Returns all the reservations in the database
 * @param {*} req The request
 * @param {*} res The response
 * @returns {*} A list of reservations
 */

const listAllReservations = (req, res) => {
    // verify access
    //Quand le locataire est connecter on lui genere un session (jwt)
    //On lit la valeur de l'authorization header qui est sous le format Bearer + Token
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    if (token == null) {
        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });
        return;
    }

    try {

        const user = jwt.verify(token, process.env.JWT_SECRET);

        if (user != undefined) {

            const role = user.role
            if (role != "administrateur") {

                res.status(403).send({
                    message: "Access Forbidden,you can't do this operation",
                });

                return;}
        }
    } catch (err) {
        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });

        return;

    }
  /*  const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    if (token == null) {

        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });
        return;
    }

    try {

        const user = jwt.verify(token, process.env.JWT_SECRET);

        if (user != undefined) {

            const role = user.role



            if (role != "locataire"   && role != "administrateur") {

                res.status(403).send({
                    message: "Access Forbidden,you can't do this operation",
                });

                return;
            }
        }

    } catch (err) {

        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });

        return;

    }*/
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
/**
 *Returns a specific reservation
 * @param {*} req The request
 * @param {*} res The response
 * @returns {*} One reservation
 */
const findReservationById = async(req, res) => {
   const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    if (token == null) {

        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });
        return;
    }

    try {

        const user = jwt.verify(token, process.env.JWT_SECRET);

        if (user != undefined) {

            const role = user.role



            if (role != "locataire"   && role != "administrateur") {

                res.status(403).send({
                    message: "Access Forbidden,you can't do this operation",
                });

                return;
            }
        }

    } catch (err) {

        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });

        return;

    }
//On recupere la reservation qui a l'id
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

/**
 *Updates a specific reservation
 * @param {*} req The request
 * @param {*} res The response
 * @returns {*} a message
 */

const updateReservationById = async(req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    if (token == null) {

        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });
        return;
    }

    try {

        const user = jwt.verify(token, process.env.JWT_SECRET);

        if (user != undefined) {

            const role = user.role



            if (role != "locataire"   && role != "administrateur") {

                res.status(403).send({
                    message: "Access Forbidden,you can't do this operation",
                });

                return;
            }
        }

    } catch (err) {

        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });

        return;

    }
    // On recupere l'id de la reservation
    const id = req.params.id;
    //On cherche le reservation qui ce id
    const reservations = await Reservation.findOne({ where: { idReservation: id} })
    //On chereche la borne se depart de la reservation
    const bornes = await Borne.findAll({ where: { idBorne: req.body.idBorneDepart} })
    //On modifie la valeur de la reservatioon
    Reservation.update(req.body, {
            where: { idReservation: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Reservation was updated successfully."
                });
                //Si la reservation est annulée on doit modifie la valeur de nbVehicules dans la borne
             if (reservations.etat ="Annulée")
             {
                 if (bornes != null) {
                     for (const born of bornes) {
                         let nb=born.nbVehicules
                         nb= nb+1

                         Borne.update(
                             { nbVehicules: nb },
                             {
                                 returning: true,
                                 where: {
                                     idBorne: req.body.idBorneDepart
                                 },

                             } )

                     }
                 }
             }
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

const deleteReservationById = async (req, res) => {
    const id = req.params.id;

    console.log(id);

    Reservation.destroy({

        where: { idReservation: id },
    })
        .then((num) => {

            where: { idReservation: id }
        })
        .then(num => {

            if (num == 1) {
                res.send({
                    message: 'Reservation was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Reservation with id=${id}. Maybe Reservation was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Reservation with id=' + id,
            });
        });
};
/**
 *Returns the  reservations of a specific user
 * @param {*} req The request
 * @param {*} res The response
 * @returns {*} A list of reservations
 */
const selectReservationOfAGivenUser = async(req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    if (token == null) {

        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });
        return;
    }

    try {

        const user = jwt.verify(token, process.env.JWT_SECRET);

        if (user != undefined) {

            const role = user.role



            if (role != "locataire"   && role != "administrateur") {

                res.status(403).send({
                    message: "Access Forbidden,you can't do this operation",
                });

                return;
            }
        }

    } catch (err) {

        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });

        return;

    }
    // on recupere la liste des reservations d'un locataire
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
/**
 *Returns all the annuled reservations
 * @param {*} req The request
 * @param {*} res The response
 * @returns {*} A list of reservations
 */
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

    const reservation = await Reservation.findOne({ where: { idVehicule: req.body.idVehicule, etat: "En cours" } })
    if (reservation != null) {
        const pinCorrect = await bcrypt.compare(req.body.codePin.toString(), reservation.codePin)
        console.log(req.body.codePin)
        if (pinCorrect) {
            Reservation.update({ etat: "Active" }, { where: { idVehicule: req.body.idVehicule, etat: "En cours" } })
            const bornDepart = await Borne.findOne({ where: { idBorne: reservation.idBorneDepart } })
            const bornDestination = await Borne.findOne({ where: { idBorne: reservation.idBorneDestination } })
            const locataire = await Locataire.findOne({ where: { idLocataire: reservation.idLocataire } })

            res.status(200).send({ success: true, reservation: reservation, bornDepart: bornDepart, bornDestination: bornDestination, locataire: locataire })
        } else {
            res.status(400).send({ success: false, message: "Code pin incorrect" })
        }
    } else {
        res.status(400).send({ success: false, message: "Pas de réservation disponible !" })
    }
}

/**
 *Returns the reservation history of a specific user
 * @param {*} req The request
 * @param {*} res The response
 * @returns {*} A list of reservations
 */
//On recupere la liste des reservations d'un locataire avec les details des reservation
const getHistoriqueReservationsAllLocataire = async(req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    if (token == null) {

        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });
        return;
    }

    try {

        const user = jwt.verify(token, process.env.JWT_SECRET);

        if (user != undefined) {

            const role = user.role



            if (role != "locataire") {

                res.status(403).send({
                    message: "Access Forbidden,you can't do this operation",
                });

                return;
            }
        }

    } catch (err) {

        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });

        return;

    }
//On recupere la liste des reservation d'un locataire
    const reservations = await Reservation.findAll({ where: { idLocataire: req.params.id } })
//on cree une variable historiqueReser pour stocker les reservations
    let historiqueReser = []


    if (reservations != null) {
        for (const reservation of reservations) {
//on cree une variable reservationFinale pour stocker les details de chaque reservation
            let reservationFinale = {
                idReservation: 0,
                etat: "",
                nomBorneDepart: "",
                numChassisVehicule: 0,
                numImmatriculationVehicule: 0,
                modeleVehicule: "",
                marqueVehicule: "",
                nomBorneDestination: "",
                dateReservation: null,
                dure: null,
                distance: null
            }

            reservationFinale.idReservation = reservation.idReservation

            reservationFinale.etat = reservation.etat

            //Recuperation nom borne de départ
            const borneDepart = await Borne.findOne({ where: { idBorne: reservation.idBorneDepart } })
            reservationFinale.nomBorneDepart = borneDepart.nomBorne
                //Recuperation nom borne de destination
            const borneDesti = await Borne.findOne({ where: { idBorne: reservation.idBorneDestination } })
            reservationFinale.nomBorneDestination = borneDesti.nomBorne
                //Recuperation des infos du véhicules
            const vehiculeInfo = await Vehicule.findOne({ where: { numChassis: reservation.idVehicule } })
            if (vehiculeInfo != null) {
                reservationFinale.numChassisVehicule = vehiculeInfo.numChassis
                reservationFinale.numImmatriculationVehicule = vehiculeInfo.numImmatriculation
                reservationFinale.modeleVehicule = vehiculeInfo.modele
                reservationFinale.marqueVehicule = vehiculeInfo.marque
            }
            if (reservation.etat == "Terminée") {
                //Recuperation des infos du trajet
                const trajetInfo = await Trajet.findOne({ where: { idReservation: reservation.idReservation } })
                if (trajetInfo != null) {
                    reservationFinale.dateReservation = trajetInfo.dateDebut
                    reservationFinale.dure = trajetInfo.tempsEstime
                    reservationFinale.distance = trajetInfo.kmParcourue

                }
            }
            //On stock les reservations dans historiqueReser
            historiqueReser.push(reservationFinale)



        }

        res.status(200).send(historiqueReser)

    } else {
        res.status(404).send({ message: "This user has no reservation " })
    }
    console.log(historiqueReser)

}

const getHistoriqueReservationsLocataire = async(req, res) => {
 /*   const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    if (token == null) {

        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });
        return;
    }

    try {

        const user = jwt.verify(token, process.env.JWT_SECRET);

        if (user != undefined) {

            const role = user.role



            if (role != "locataire") {

                res.status(403).send({
                    message: "Access Forbidden,you can't do this operation",
                });

                return;
            }
        }

    } catch (err) {

        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });

        return;

    }


*/
    const reservations = await Reservation.findAll({ where: { idLocataire: req.params.id} })

    let historiqueReser = []


    if (reservations != null) {
        for(const reservation of reservations) {
if (reservation.etat!="Active"){
            let reservationFinale = {
                idReservation: 0, etat: "", nomBorneDepart: "", numChassisVehicule: 0,
                numImmatriculationVehicule: 0, modeleVehicule: "", marqueVehicule: "", nomBorneDestination: "",
                dateReservation: null, dure: null, distance: null,prix:null
            }

            reservationFinale.idReservation = reservation.idReservation

            reservationFinale.etat = reservation.etat

            //Recuperation nom borne de départ
            const borneDepart = await Borne.findOne({where: {idBorne: reservation.idBorneDepart}})
            reservationFinale.nomBorneDepart = borneDepart.nomBorne
            //Recuperation nom borne de destination
            const borneDesti = await Borne.findOne({where: {idBorne: reservation.idBorneDestination}})
            reservationFinale.nomBorneDestination = borneDesti.nomBorne
            //Recuperation des infos du véhicules
            const vehiculeInfo = await Vehicule.findOne({where: {numChassis: reservation.idVehicule}})
            if (vehiculeInfo != null) {
                reservationFinale.numChassisVehicule = vehiculeInfo.numChassis
                reservationFinale.numImmatriculationVehicule = vehiculeInfo.numImmatriculation
                reservationFinale.modeleVehicule = vehiculeInfo.modele
                reservationFinale.marqueVehicule = vehiculeInfo.marque
            }
            if (reservation.etat == "Terminée") {
                const trajetInfo = await Trajet.findOne({where: {idReservation: reservation.idReservation}})
                if (trajetInfo != null) {
                    reservationFinale.dateReservation = trajetInfo.dateDebut
                    reservationFinale.dure = trajetInfo.tempsEstime
                    reservationFinale.distance = trajetInfo.kmParcourue
                    reservationFinale.prix = trajetInfo.prixAPayer

                }
            }
            historiqueReser.push(reservationFinale)


        }   }

        res.status(200).send(historiqueReser)

    } else {
        res.status(404).send({ message :"This user has no reservation "})
    }
    console.log(historiqueReser)

}


export default {
    createReservation,//locataire
    listAllReservations,//admin
    findReservationById,//admin+Locataire
    deleteReservationById,
    updateReservationById,//admin+locataire
    verifyCodePin,
    selectReservationOfAGivenUser,//admin+locataire
    getReservationAnnulee,
    getHistoriqueReservationsLocataire,//locataire
    getHistoriqueReservationsAllLocataire,//locataire

}
//npm run start-test-windows