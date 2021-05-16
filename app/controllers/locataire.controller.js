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
    Locataire.findAll({ where: 1 === 1 })
        .then(data => {
            data.forEach(element => {
                if (element.email === req.body.email) {
                    res.status(400).send({
                        message: "Email déja existé"
                    });
                    return;
                }
            });

        })


    var locataire = {

        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motDePasse: req.body.motdepasse

    };
    //Pour hasher le mot de passe 
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(locataire.motDePasse, salt);
    locataire.motDePasse = hash;


    // Enregistrer le locataire dans la BDD
    Locataire.create(locataire)
        .then(data => {
            //Création reussite
            res.status(200).send({
                message: "Création réuissite"
            });
        })
        .catch(err => {
            //Création non reussite
            res.status(500).send({
                message: "Une erreur  lors de la création de locataire"
            });
        });

};
// La creation d'un locataire via gmail

const createLocataireGmail = async(req, res) => {
    var token = req.body.token;
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];

        //Pour tester l'existance de l'email
        Locataire.findAll({ where: 1 === 1 })
            .then(data => {
                data.forEach(element => {
                    if (element.email === payload.email) {
                        res.status(400).send({
                            message: "Email déja existé"
                        });
                        return;
                    }
                });

            })
        var locataire = {

            nom: payload.given_name,
            prenom: payload.family_name,
            email: payload.email,
            motDePasse: payload.email + payload.name //Un mot de passe par defaut

        };
        //Pour hasher le mot de passe 
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(locataire.motDePasse, salt);
        locataire.motDePasse = hash;

        // Enregistrer le locataire dans la BDD
        Locataire.create(locataire)
            .then(data => {
                //Création reussite
                res.status(200).send({
                    message: "Création réuissite"
                });
            })
            .catch(err => {
                //Création non reussite
                res.status(500).send({
                    message: "Une erreur  lors de la création de locataire"
                });
            });


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
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving locataire."
            });
        });
};


export default {
    createLocataire,
    findAll,
    findOne,
    createLocataireGmail
}
