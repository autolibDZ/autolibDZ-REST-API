const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const validator = require('validator');
const passwordValidator = require('password-validator')
const db = require("../models");

var passwdValidator = new passwordValidator();
 
// ajouter des propriétés aux validateurs de mot de passe
passwdValidator
.is().min(8)                                    // Mot de passe de taille minimum 8
.is().max(100)                                  // Mot de passe de taille maximum 100
.has().uppercase()                              // Doit avoir des lettre en majuscules
.has().lowercase()                              // Doit avoir des lettres en miniscules


//Cette fonctionne permet de récupérer le type d'utilisateur
//Elle retourne dans ce cas une valeur entre les 4 types suivants :
//Administrateur, Operateur, Agent ou Dirigeant
function getTypeUtilisateur(Url) {
    Url = Url.substr(1)
    var i = 0
    var result = ""
    while((Url[i]!=='/') && (Url[i]!==undefined ) && (Url[i]!=='?' )){
        result = result+Url[i]
        i++
    }
    return result
}



//Cette fonction permet d'appeler le model (du dossier models) correspondant
function getModel(url){
    var typeUtilisateur = getTypeUtilisateur(url)
    var Utilisateur;
    if(typeUtilisateur==='administrateurs'){
        Utilisateur = db.administrateurs;
    }else if(typeUtilisateur==='agents'){
        Utilisateur = db.agents;
    }else if(typeUtilisateur==='operateurs'){
        Utilisateur = db.operateurs;
    }else{
        Utilisateur = db.dirigeants;
    }  
    return Utilisateur
}

// Récupérer un employé avec un id donné

exports.findOne = (req, res) => {

    //Récupérer le type d'employé à créer
    const Employe = getModel(req.originalUrl)

    //Récupérer l'id de l'employé à modifier de l'url
    const id = req.params.id;
  
    Employe.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la récupération de l'employé avec l'id=" + id
        });
    });
};

//Récupérer des employés avec une condition sur le nom (ou sans condition, dans ce cas retourne tout les employes)

exports.findAll = (req, res) => {
    
    //Récupérer le type d'employé à créer
    const Employe = getModel(req.originalUrl)

    //Récupérer le nom de l'employé de l'url
    const nom = req.query.nom;

    //Créer la variable condition
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;
  
    Employe.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Une erreur est survenue lors de la récupération des employés."
        });
    });
};

//Création d'un employé

exports.create = (req, res) => {
    //Récupérer le type d'employé à créer
    const Employe = getModel(req.originalUrl)
          
    //Initialiser les attributs de l'employé à créer
    const employe = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        mdp: req.body.mdp,
        salaire: req.body.salaire   
    };

    //Validation de l'email de l'employé à créer
    if(validator.isEmail(employe.email)===false){
        res.status(500).send({
            message:"L'email est non valide!"             
        });
        return;
    }else{
        if(employe.nom==undefined || employe.prenom==undefined){
            res.status(500).send({
                message:"Les champs nom et prénom sont requis!"             
            });
            return;
        }else{
            //Vérifier si les attributs 'nom' et 'prénom' ne sont pas vides
            if((validator.isEmpty(employe.nom)) || (validator.isEmpty(employe.prenom))){
                res.status(500).send({
                    message:"Le champ nom et prénom ne peuvent pas etre vides!"             
                });
                return;
            }else{
                if(!passwdValidator.validate(employe.mdp)){
                    res.status(500).send({
                        message:"Mot de passe invalide!",
                    });
                    return;
                }else{
                    //Créer l'employé
                    Employe.create(employe)
                    .then(data => {
                        //Si la création réussit on affiche les champs de l'employé créé
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Une erreur est survenue lors de la création de l'employé!"
                        });
                    });
                }
            }
        }
    }     
};

//Modification d'un employé

exports.update = (req, res) => {
    //Récupérer le type d'employé à créer
    const Employe = getModel(req.originalUrl)

    //Récupérer l'id de l'employé à modifier de l'url
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
    if(req.body.mdp){
        if(!passwdValidator.validate(req.body.mdp)){
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

    //Modifier l'employé
    Employe.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "L'employé a bien été modifié!"
            });
        }else{
            res.send({
                message: `Employé avec id=${id} non modifié. Peut etre l'employé n'a pas été trouvé!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la modification de l'employé avec l'id=" + id
        });
    });
};

//Supprimer un employé

exports.delete = (req, res) => {
     //Récupérer le type d'employé à créer
    const Employe = getModel(req.originalUrl)

    //Récupérer l'id de l'employé à modifier de l'url
    const id = req.params.id;
  
    Employe.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Employé a été supprimé!"
            });
        }else{
            res.send({
                message: `Employé avec id=${id} non supprimé. Peut etre l'employé n'a pas été trouvé!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la suppression de l'employé avec l'id=" + id
        });
    });
};

//Supprimer tout les employés 

exports.deleteAll = (req, res) => {
    
    //Récupérer le type d'employé à créer
    const Employe = getModel(req.originalUrl)

    Employe.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} employés ont été supprimés avec succés!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la suppression!"
        });
    });
};
