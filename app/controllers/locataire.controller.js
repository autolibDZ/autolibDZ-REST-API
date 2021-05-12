const db = require("../models");
const Locataire = db.locataire;
var bcrypt = require('bcryptjs');


// La creation d'un locataire (lors de l'inscription)
const createLocataire = async(req, res) => {
    // Validate request
    if (!req.body.nom || !req.body.prenom || !req.body.email || !req.body.motdepasse) {
        res.status(400).send({
            message: "Missing data"
        });
        return;
    }


    var locataire = {

        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motdepasse: req.body.motdepasse

    };
    //Pour hasher le mot de passe 
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(locataire.motdepasse, salt);
    locataire.motdepasse = hash;

    // Enregistrer le locataire dans la BDD
    try {


        console.log(locataire.motdepasse)
        data = await Locataire.create(locataire)
        res.send(data);

    } catch (err) {
        res.status(500).send({
            error: err.message || "Erreur lors de la creation de locataire"
        });
    }

};

//Retourner tout les locataires
const findAll = (req, res) => {
    var condition = 1 === 1

    Locataire.findAll({ where: condition })
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
    findAll
}