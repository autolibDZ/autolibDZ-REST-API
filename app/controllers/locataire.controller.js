const db = require("../models");
const bcrypt = require("bcryptjs")
const Locataire = db.locataire;

// La creation d'un locataire (lors de l'inscription)
const createLocataire = async(req, res) => {
    // Validate request
    if (!req.body.nom || !req.body.prenom || !req.body.email || !req.body.motdepasse) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }


    
           
    const salt = await bcrypt.genSalt(10);
    const mdp = await bcrypt.hash(req.body.motdepasse,salt);  
        
    const locataire = {

        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motDePasse: mdp

    };

 
    // Enregistrer le locataire dans la BDD
    try {
        const data = await Locataire.create(locataire)
        res.send({success: true});

    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the locataire."
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

const  findOne = async(req, res) => {

    Locataire.findOne({ where: {idLocataire: req.params.id} })
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
    findOne
}