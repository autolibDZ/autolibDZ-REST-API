const { Sequelize } = require('../models');
const db = require('../models');
const Locataire = db.locataire;
const Abonnement = db.abonnement;
const validator = require('validator');
var bcrypt = require('bcryptjs');
var CLIENT_ID =
    '648513849628-s30qhqtimiq4mclrmb6a85svvt5hk8u6.apps.googleusercontent.com';
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
const mailgun = require('mailgun-js');
const DOMAIN = 'sandboxe0404f8c28904674a2f02a65fc8bafca.mailgun.org';
const api_key = 'a1b416a5e0552819df1578e8cd5272ff-fa6e84b7-67a3ab78';
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

//Activate account
const validateAccount = (req, res) => {
    const email = req.params.email;
    Locataire.update({
            ValidationGmail: true,
        }, {
            where: {
                email: email,
            },
        })
        .then((num) => {
            if (num == 1) {
                res.setHeader('Content-type', 'text/html');
                res
                    .status(200)
                    .send(
                        '<h2>Your account is activated , Thank you for using AutoLib</h2>'
                    );
            } else {
                res.status(400).send('<h2>Can not activate your account</h2>');
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error validating account with email=' + email,
            });
        });
};
// La creation d'un locataire (lors de l'inscription normal)
const createLocataire = async(req, res) => {
    // Les champs obligatoires
    if (!req.body.nom ||
        !req.body.prenom ||
        !req.body.email ||
        !req.body.motDePasse
    ) {
        res.status(400).send({
            message: 'Missing data',
        });
        return;
    } else if (validator.isEmail(req.body.email) === false) {
        res.status(400).send({
            message: "L'email est non valide",
        });
        return;
    }
    //Pour tester l'existance de l'email
    const locataires = await Locataire.findOne({
        where: { email: req.body.email },
    });
    if (locataires != null) {
        res.status(400).send({
            message: 'Email déja existé',
        });
    } else {
        ///////
        const data = {
            from: 'AutoLib-DZ@esi.dz',
            to: req.body.email,
            subject: 'Validation account',
            html: `
            <!DOCTYPE html>
            <html>
                <body>
                    <h2>Click here to activate your account</h2>
                    <a href="https://autolib-dz.herokuapp.com/api/locataire/validateAccount/${req.body.email}">Activate here</a>
                </body>
            </html>
                               `,
        };
        var find = false;
        mg.messages().send(data, function(error, body) {
            if (error) {

                find = true;

                // res.status(400).send({
                //   message: "Email n'existe pas",
                //});
            }
        });
        /////
        if (!find) {
            var locataire = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                motDePasse: req.body.motDePasse,
                Active: true,
                ValidationGmail: false,
                isDeleted: false

            };
            //Pour hasher le mot de passe
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(locataire.motDePasse, salt);
            locataire.motDePasse = hash;

            await Locataire.create(locataire)
                .then((data) => {
                    //Création reussite
                    res.status(200).send({
                        message: 'Création réussite',
                    });
                })
                .catch((err) => {
                    //Création non reussite
                    res.status(500).send({
                        message: 'Une erreur  lors de la création de locataire',
                    });
                });
            const loc = await Locataire.findOne({ where: { email: locataire.email } })
            const abonnement = {
                balance: 0,
                idLocataire: loc.idLocataire
            }

            let data = await Abonnement.create(abonnement)

        }
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
        const locataires = await Locataire.findOne({
            where: { email: payload.email },
        });
        if (locataires != null) {
            res.status(400).send({
                message: 'Email déja existé',
            });
        } else {
            var locataire = {
                nom: payload.given_name,
                prenom: payload.family_name,
                email: payload.email,
                motDePasse: payload.email, //Un mot de passe par defaut
                Active: true,
                ValidationGmail: true,
                isDeleted: false
            };
            //Pour hasher le mot de passe
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(locataire.motDePasse, salt);
            locataire.motDePasse = hash;

            // Enregistrer le locataire dans la BDD
            await Locataire.create(locataire)
                .then((data) => {
                    //Création reussite
                    res.status(200).send({
                        message: 'Création réussite',
                    });
                })
                .catch((err) => {
                    //Création non reussite
                    res.status(500).send({
                        message: 'Une erreur  lors de la création de locataire',
                    });
                });
        }
    }
    verify().catch(console.error);
};

//Retourner tout les locataires
const findAll = (req, res) => {
    Locataire.findAll({ where: { isDeleted: false } })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Une erreur lors de la récupration des locataires.',
            });
        });
};

const findOne = async(req, res) => {
    Locataire.findOne({ where: { idLocataire: req.params.id, isDeleted: false } })
        .then((data) => {
            if (!data) res.status(404).send({ message: 'Locataire non existant' });
            else res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving locataire.',
            });
        });
};
// Update a Locataire by the id in the request

const updateEmail = async(req, res) => {
    const id = req.params.id;

    //Pour tester l'existance de l'email
    const locataires = await Locataire.findOne({
        where: { email: req.body.email, isDeleted: false },
    });
    const locataire = await Locataire.findOne({
        where: {
            idLocataire: id,
        }
    });
    const motdepasseCorrect = await bcrypt.compare(req.body.motDePasse, locataire.motDePasse);
    if (locataires != null || !motdepasseCorrect) {
        res.status(400).send({
            message: `On peut peut pas modifier le locataire avec id=${id}.`,
        });
    } else {
        delete req.body.motDePasse;
        Locataire.update(req.body, {
                where: { idLocataire: id },
            })
            .then((num) => {
                if (num == 1) {
                    res.status(200).send({
                        message: 'Locataire a été crée avec succes',
                    });
                } else {
                    res.status(400).send({
                        message: `On peut peut pas modifier le locataire avec id=${id}.`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Error updating Locataire with id=' + id,
                });
            });
    }
};
// Update a Locataire by the id in the request

const updatePassword = async(req, res) => {
    const id = req.params.id;

    const locataire = await Locataire.findOne({
        where: {
            idLocataire: id,
        },
    });
    const motdepasseCorrect = await bcrypt.compare(req.body.motDePasse, locataire.motDePasse);
    if (!motdepasseCorrect) {
        res.status(400).send({
            message: "Ancienne mot de passe n'est pas correct"
        })
    } else {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.newMotDePasse, salt);
        req.body.motDePasse = hash;
        delete req.body.newMotDePasse;
        Locataire.update(req.body, {
                where: { idLocataire: id },
            })
            .then((num) => {
                if (num == 1) {
                    res.status(200).send({
                        message: 'Locataire a été mis à jour avec succes',
                    });
                } else {
                    res.status(400).send({
                        message: `On peut peut pas modifier le locataire avec id=${id}.`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Error updating Locataire with id=' + id,
                });
            });
    }
};

// Delete a Locataire with the specified id in the request
const deleteLocataire = (req, res) => {
    const id = req.params.id;

    Locataire.update({
            isDeleted: true,
        }, {
            where: {
                idLocataire: id,
            },
        })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: 'Locataire a été supprimé avec succes!',
                });
            } else {
                res.status(400).send({
                    message: `On peut pas supprimer le locataire avev id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Locataire with id=' + id,
            });
        });
};

// Block or Unblock a locataire
const block = (req, res) => {
    const id = req.params.id;
    Locataire.update({
            Active: Sequelize.literal('not "Active"'),
            // Active: true
        }, {
            where: {
                idLocataire: id,
            },
        })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: 'Locataire was updated successfully.',
                });
            } else {
                res.status(400).send({
                    message: `Cannot update Locataire with id=${id}. Maybe Locataire was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Locataire with id=' + id,
            });
        });
};

export default {
    createLocataire,
    findAll,
    findOne,
    validateAccount,
    createLocataireGmail,
    updateEmail,
    updatePassword,
    deleteLocataire,
    block,
};