const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const validator = require('validator');
const passwordValidator = require('password-validator')
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const db = require("../models");
const Dirigeant = db.dirigenat;

var passwdValidator = new passwordValidator();
 
// ajouter des propriétés aux validateurs de mot de passe
passwdValidator
.is().min(8)                                    // Mot de passe de taille minimum 8
.is().max(100)                                  // Mot de passe de taille maximum 100
.has().uppercase()                              // Doit avoir des lettre en majuscules
.has().lowercase()                              // Doit avoir des lettres en miniscules

// Récupérer un Dirigeant avec un id donné

exports.findOne = (req, res) => {

    //Récupérer l'id de l'Dirigeant à modifier de l'url
    const id = req.params.id;
  
    Dirigeant.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la récupération de l'Dirigeant avec l'id=" + id
        });
    });
};

//Récupérer des Dirigeants avec une condition sur le nom (ou sans condition, dans ce cas retourne tout les Dirigeants)

exports.findAll = (req, res) => {

    //Récupérer le nom de l'Dirigeant de l'url
    const nom = req.query.nom;

    //Créer la variable condition
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;
  
    Dirigeant.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Une erreur est survenue lors de la récupération des Dirigeants."
        });
    });
};

//Création d'un Dirigeant

exports.create = (req, res) => {
          
    //Initialiser les attributs de l'Dirigeant à créer
    const dirigeant = {
        //idDirigeant:req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motDePasse: req.body.motDePasse,
        salaire: req.body.salaire   
    };

    //Validation de l'email de l'Dirigeant à créer
    if(validator.isEmail(dirigeant.email)===false){
        res.status(500).send({
            message:"L'email est non valide!"             
        });
        return;
    }else{
        if(dirigeant.nom==undefined || dirigeant.prenom==undefined){
            res.status(500).send({
                message:"Les champs nom et prénom sont requis!"             
            });
            return;
        }else{
            //Vérifier si les attributs 'nom' et 'prénom' ne sont pas vides
            if((validator.isEmpty(dirigeant.nom)) || (validator.isEmpty(dirigeant.prenom))){
                res.status(500).send({
                    message:"Le champ nom et prénom ne peuvent pas etre vides!"             
                });
                return;
            }else{
                if(!passwdValidator.validate(dirigeant.motDePasse)){
                    res.status(500).send({
                        message:"Mot de passe invalide!",
                    });
                    return;
                }else{
                    //hasher le mot de passe
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(dirigeant.motDePasse, salt);
                    dirigeant.motDePasse= hash;
                    //Créer l'Dirigeant
                    Dirigeant.create(dirigeant)
                    .then(data => {
                        //Si la création réussit on affiche les champs de l'dirigeant créé
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Une erreur est survenue lors de la création de l'Dirigeant!"
                        });
                    });
                }
            }
        }
    }     
};

//Modification d'un Dirigeant

exports.update = (req, res) => {

    //Récupérer l'id de l'Dirigeant à modifier de l'url
    const id = req.params.id;
  
    //Validation des données modifiées
    //Email si modifié
    if(req.body.email){
        if(!validator.isEmail(req.body.email)){
            res.status(500).send({
                message:"Email invalide!",
            });
            return;            
        }
    }
    //Mot de passe si modifié
    if(req.body.motDePasse){
        if(!passwdValidator.validate(req.body.motDePasse)){
            res.status(500).send({
                message:"Mot de passe invalide!",
            });
            return;            
        }
    }
    //Nom si modifié
    if(req.body.nom){
        if(validator.isEmpty(req.body.nom)){
            res.status(500).send({
                message:"Le champ nom ne peut pas etre vide!"             
            });
            return;
        }
    }
    //Nom si modifié
    if(req.body.prenom){
        if(validator.isEmpty(req.body.prenom)){
            res.status(500).send({
                message:"Le champ prenom ne peut pas etre vide!"             
            });
            return;
        }
    }

    //Modifier l'Dirigeant
    Dirigeant.update(req.body, {
        where: { idDirigeant: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "L'Dirigeant a bien été modifié!"
            });
        }else{
            res.send({
                message: `Dirigeant avec id=${id} non modifié. Peut etre l'Dirigeant n'a pas été trouvé!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la modification de l'Dirigeant avec l'id=" + id
        });
    });
};

//Supprimer un Dirigeant

exports.delete = (req, res) => {

    //Récupérer l'id de l'Dirigeant à modifier de l'url
    const id = req.params.id;
  
    Dirigeant.destroy({
        where: { idDirigeant: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Dirigeant a été supprimé!"
            });
        }else{
            res.send({
                message: `Dirigeant avec id=${id} non supprimé. Peut etre l'Dirigeant n'a pas été trouvé!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la suppression de l'Dirigeant avec l'id=" + id
        });
    });
};

//Supprimer tout les Dirigeants 

exports.deleteAll = (req, res) => {

    Dirigeant.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Dirigeants ont été supprimés avec succés!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la suppression!"
        });
    });
};
