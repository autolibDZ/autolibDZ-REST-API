const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const validator = require('validator');
const passwordValidator = require('password-validator')
const db = require("../models");
const Operateur = db.operateur;

var passwdValidator = new passwordValidator();
 
// ajouter des propriétés aux validateurs de mot de passe
passwdValidator
.is().min(8)                                    // Mot de passe de taille minimum 8
.is().max(100)                                  // Mot de passe de taille maximum 100
.has().uppercase()                              // Doit avoir des lettre en majuscules
.has().lowercase()                              // Doit avoir des lettres en miniscules

// Récupérer un Operateur avec un id donné

exports.findOne = (req, res) => {

    //Récupérer l'id de l'Operateur à modifier de l'url
    const id = req.params.id;
  
    Operateur.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la récupération de l'Operateur avec l'id=" + id
        });
    });
};

//Récupérer des Operateurs avec une condition sur le nom (ou sans condition, dans ce cas retourne tout les Operateurs)

exports.findAll = (req, res) => {

    //Récupérer le nom de l'Operateur de l'url
    const nom = req.query.nom;

    //Créer la variable condition
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;
  
    Operateur.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Une erreur est survenue lors de la récupération des Operateurs."
        });
    });
};

//Création d'un Operateur

exports.create = (req, res) => {
          
    //Initialiser les attributs de l'Operateur à créer
    const operateur = {
        idOperateur:req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motDePasse: req.body.motDePasse,
        salaire: req.body.salaire   
    };

    //Validation de l'email de l'Operateur à créer
    if(validator.isEmail(operateur.email)===false){
        res.status(500).send({
            message:"L'email est non valide!"             
        });
        return;
    }else{
        if(operateur.nom==undefined || operateur.prenom==undefined){
            res.status(500).send({
                message:"Les champs nom et prénom sont requis!"             
            });
            return;
        }else{
            //Vérifier si les attributs 'nom' et 'prénom' ne sont pas vides
            if((validator.isEmpty(operateur.nom)) || (validator.isEmpty(operateur.prenom))){
                res.status(500).send({
                    message:"Le champ nom et prénom ne peuvent pas etre vides!"             
                });
                return;
            }else{
                if(!passwdValidator.validate(operateur.motDePasse)){
                    res.status(500).send({
                        message:"Mot de passe invalide!",
                    });
                    return;
                }else{
                    //Créer l'Operateur
                    Operateur.create(operateur)
                    .then(data => {
                        //Si la création réussit on affiche les champs de l'operateur créé
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Une erreur est survenue lors de la création de l'Operateur!"
                        });
                    });
                }
            }
        }
    }     
};

//Modification d'un Operateur

exports.update = (req, res) => {

    //Récupérer l'id de l'Operateur à modifier de l'url
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

    //Modifier l'Operateur
    Operateur.update(req.body, {
        where: { idOperateur: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "L'Operateur a bien été modifié!"
            });
        }else{
            res.send({
                message: `Operateur avec id=${id} non modifié. Peut etre l'Operateur n'a pas été trouvé!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la modification de l'Operateur avec l'id=" + id
        });
    });
};

//Supprimer un Operateur

exports.delete = (req, res) => {

    //Récupérer l'id de l'Operateur à modifier de l'url
    const id = req.params.id;
  
    Operateur.destroy({
        where: { idOperateur: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Operateur a été supprimé!"
            });
        }else{
            res.send({
                message: `Operateur avec id=${id} non supprimé. Peut etre l'Operateur n'a pas été trouvé!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la suppression de l'Operateur avec l'id=" + id
        });
    });
};

//Supprimer tout les Operateurs 

exports.deleteAll = (req, res) => {

    Operateur.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Operateurs ont été supprimés avec succés!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la suppression!"
        });
    });
};
