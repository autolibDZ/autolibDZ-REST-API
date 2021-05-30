const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const validator = require('validator');
const passwordValidator = require('password-validator')
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const db = require("../models");
const Administrateur = db.administrateur;

var passwdValidator = new passwordValidator();
 
// ajouter des propriétés aux validateurs de mot de passe
passwdValidator
.is().min(8)                                    // Mot de passe de taille minimum 8
.is().max(100)                                  // Mot de passe de taille maximum 100
.has().uppercase()                              // Doit avoir des lettre en majuscules
.has().lowercase()                              // Doit avoir des lettres en miniscules


/**
 * Récupérer un Administrateur avec un id donné
 * @param {*} req la requete
 * @param {*} res la reponse
 */
// Récupérer un Administrateur avec un id donné

const getAdmin = (req, res) => {

    //Récupérer l'id de l'Administrateur à modifier de l'url
    const id = req.params.id;
  
    Administrateur.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la récupération de l'Administrateur avec l'id=" + id
        });
    });
};

/**
 * Récupérer des Administrateurs avec une condition sur le nom 
 * ou sans condition, dans ce cas retourne tout les Administrateurs
 * @param {*} req la requete
 * @param {*} res la reponse
 */
//Récupérer des Administrateurs avec une condition sur le nom (ou sans condition, dans ce cas retourne tout les Administrateurs)

const getAllAdmins = async(req,res)=>{

    //Récupérer le nom de l'Administrateur de l'url
    const nom = req.query.nom;

    //Créer la variable condition
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;
  
    Administrateur.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Une erreur est survenue lors de la récupération des Administrateurs."
        });
    });
};


/**
 * Création d'un Administrateur
 * @param {*} req la requete
 * @param {*} res la reponse
 */
//Création d'un Administrateur

const createAdmin = async(req,res)=>{
          
    //Initialiser les attributs de l'Administrateur à créer
    const admin = {
        //idAdministrateur:req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motDePasse: req.body.motDePasse,
        salaire: req.body.salaire   
    };

    //Validation de l'email de l'Administrateur à créer
    if(validator.isEmail(admin.email)===false){
        res.status(500).send({
            message:"L'email est non valide!"             
        });
        return;
    }else{
        if(admin.nom==undefined || admin.prenom==undefined){
            res.status(500).send({
                message:"Les champs nom et prénom sont requis!"             
            });
            return;
        }else{
            //Vérifier si les attributs 'nom' et 'prénom' ne sont pas vides
            if((validator.isEmpty(admin.nom)) || (validator.isEmpty(admin.prenom))){
                res.status(500).send({
                    message:"Le champ nom et prénom ne peuvent pas etre vides!"             
                });
                return;
            }else{
                if(!passwdValidator.validate(admin.motDePasse)){
                    res.status(500).send({
                        message:"Mot de passe invalide!",
                    });
                    return;
                }else{
                    //hasher le mot de passe
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(admin.motDePasse, salt);
                    admin.motDePasse= hash;
                    //Créer l'Administrateur
                    Administrateur.create(admin)
                    .then(data => {
                        //Si la création réussit on affiche les champs de l'admin créé
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Une erreur est survenue lors de la création de l'administrateur!"
                        });
                    });
                }
            }
        }
    }     
};


/**
 * Modification d'un Administrateur
 * @param {*} req la requete
 * @param {*} res la reponse
 */
//Modification d'un Administrateur

const updateAdmin = (req, res) => {

    //Récupérer l'id de l'Administrateur à modifier de l'url
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
        //hasher le mot de passe
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.motDePasse, salt);
        req.body.motDePasse= hash;
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

    //Modifier l'Administrateur
    Administrateur.update(req.body, {
        where: { idAdministrateur: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "L'Administrateur a bien été modifié!"
            });
        }else{
            res.send({
                message: `Administrateur avec id=${id} non modifié. Peut etre l'Administrateur n'a pas été trouvé!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la modification de l'Administrateur avec l'id=" + id
        });
    });
};

/**
 * Supprimer un Administrateur
 * @param {*} req la requete
 * @param {*} res la reponse
 */
//Supprimer un Administrateur

const deleteAdmin = (req, res) => {

    //Récupérer l'id de l'Administrateur à modifier de l'url
    const id = req.params.id;
  
    Administrateur.destroy({
        where: { idAdministrateur: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Administrateur a été supprimé!"
            });
        }else{
            res.send({
                message: `Administrateur avec id=${id} non supprimé. Peut etre l'Administrateur n'a pas été trouvé!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la suppression de l'Administrateur avec l'id=" + id
        });
    });
};

/**
 * Supprimer tout les Administrateurs
 * @param {*} req la requete
 * @param {*} res la reponse
 */
//Supprimer tout les Administrateurs 

const deleteAllAdmins = async (req, res) => {

    Administrateur.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Administrateurs ont été supprimés avec succés!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la suppression!"
        });
    });
};

export default {
    createAdmin,
    getAllAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin,
    deleteAllAdmins
};