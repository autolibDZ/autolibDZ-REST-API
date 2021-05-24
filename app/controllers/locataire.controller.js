const { Sequelize } = require('../models');
const db = require("../models");
const Locataire = db.locataire;
const validator = require('validator');
var bcrypt = require('bcryptjs');
var CLIENT_ID = '648513849628-s30qhqtimiq4mclrmb6a85svvt5hk8u6.apps.googleusercontent.com'
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);


// La creation d'un locataire (lors de l'inscription normal)
const createLocataire = async(req, res) => {
    // Les champs obligatoires
    if (!req.body.nom || !req.body.prenom || !req.body.email || !req.body.motdepasse) {
        res.status(400).send({
            message: "Missing data"
        });
        return;
    } else if (validator.isEmail(req.body.email) === false) {
        res.status(400).send({
            message: "L'email est non valide"
        });
        return;
    }
    //Pour tester l'existance de l'email
    const locataires = await Locataire.findOne({ where: { email: req.body.email } })
    console.log(locataires != null)
    if (locataires != null) {
        res.status(400).send({
            message: "Email déja existé"
        });
    } else {
        var locataire = {

            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            motDePasse: req.body.motdepasse,
            Active: req.body.Active ? req.body.Active : false

        };
        //Pour hasher le mot de passe 
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(locataire.motDePasse, salt);
        locataire.motDePasse = hash;


        // Enregistrer le locataire dans la BDD
        await Locataire.create(locataire)
            .then(data => {
                //Création reussite
                res.status(200).send({
                    message: "Création réussite"
                });
            })
            .catch(err => {
                //Création non reussite
                res.status(500).send({
                    message: "Une erreur  lors de la création de locataire"
                });
            });
    }

};
// La creation d'un locataire via gmail

const createLocataireGmail = async(req, res) => {
    var token = req.body.token;
    async function verify() {
        const ticket = await client.verifyIdTokenAsync({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        //Pour tester l'existance de l'email
        const locataires = await Locataire.findOne({ where: { email: payload.email } })
        if (locataires != null) {
            res.status(400).send({
                message: "Email déja existé"
            });
        } else {


            var locataire = {

                nom: payload.given_name,
                prenom: payload.family_name,
                email: payload.email,
                motDePasse: payload.email, //Un mot de passe par defaut
                Active: false

            };
            //Pour hasher le mot de passe 
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(locataire.motDePasse, salt);
            locataire.motDePasse = hash;

            // Enregistrer le locataire dans la BDD
            await Locataire.create(locataire)
                .then(data => {
                    //Création reussite
                    res.status(200).send({
                        message: "Création réussite"
                    });
                })
                .catch(err => {
                    //Création non reussite
                    res.status(500).send({
                        message: "Une erreur  lors de la création de locataire"
                    });
                });

        }
    }
    verify().catch(console.error);

}

//Retourner tout les locataires
const findAll = (req, res) => {
    var condition = 1 === 1

    Locataire.findAll({ where: condition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur lors de la récupration des locataires."
            });
        });
};

const findOne = async(req, res) => {

    Locataire.findOne({ where: { idLocataire: req.params.id } })
        .then(data => {
            if (!data) res.status(404).send({ message: "Locataire non existant" })
            else res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving locataire."
            });
        });
};
// Update a Locataire by the id in the request

const update = async(req, res) => {
    const id = req.params.id;
    //Pour tester l'existance de l'email
    const locataires = await Locataire.findOne({ where: { email: req.body.email } })
    if (locataires != null) {
        delete req.body.email;
    }
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.motDePasse, salt);
    req.body.motDePasse = hash;
    Locataire.update(req.body, {

            where: { idLocataire: id }
        })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Locataire was updated successfully."
                });
            } else {
                res.status(400).send({
                    message: `Cannot update Locataire with id=${id}. Maybe Locataire was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Locataire with id=" + id
            });
        });
};



// Delete a Locataire with the specified id in the request
const deleteLocataire = (req, res) => {
    const id = req.params.id;

    Locataire.destroy({
<<<<<<< HEAD

            where: { idLocataire: id }
        })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Locataire was deleted successfully!"
                });
            } else {
                res.status(400).send({
                    message: `Cannot delete Locataire with id=${id}. Maybe Locataire was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Locataire with id=" + id
            });
=======
      where: { idLocataire: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            message: "Locataire was deleted successfully!"
          });
        } else {
          res.status(400).send({
            message: `Cannot delete Locataire with id=${id}. Maybe Locataire was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Locataire with id=" + id
>>>>>>> e0a1b6582a7da1d25aafe829f627a0608a412131
        });
}

// Block or Unblock a locataire
const block = (req, res) => {
    const id = req.params.id;
    Locataire.update({
            Active: Sequelize.literal('not "Active"')
                // Active: true
        }, {
            where: {
                idLocataire: id
            }
        }).then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Locataire was updated successfully."
                });
            } else {
                res.status(400).send({
                    message: `Cannot update Locataire with id=${id}. Maybe Locataire was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Locataire with id=" + id
            });
        });
};


export default {
    createLocataire,
    findAll,
    findOne,
    createLocataireGmail,
    update,
    deleteLocataire,
    block
}