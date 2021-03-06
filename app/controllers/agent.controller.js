const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const validator = require('validator');
const passwordValidator = require('password-validator')
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const db = require("../models");
const Agent = db.agent;


var passwdValidator = new passwordValidator();
 
// ajouter des propriétés aux validateurs de mot de passe
passwdValidator
.is().min(8)                                    // Mot de passe de taille minimum 8
.is().max(100)                                  // Mot de passe de taille maximum 100
.has().uppercase()                              // Doit avoir des lettre en majuscules
.has().lowercase()                              // Doit avoir des lettres en miniscules


/**
 * Récupérer un Agent avec un id donné
 * @param {*} req la requete
 * @param {*} res la reponse
 */
// Récupérer un Agent avec un id donné

const getAgent = (req, res) => {

    //Récupérer l'id de l'Agent à modifier de l'url
    const id = req.params.id;
  
    Agent.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la récupération de l'Agent avec l'id=" + id
        });
    });
};

/**
 * Récupérer des Agents avec une condition sur le nom 
 * ou sans condition, dans ce cas retourne tout les Agents
 * @param {*} req la requete
 * @param {*} res la reponse
 */
//Récupérer des Agents avec une condition sur le nom (ou sans condition, dans ce cas retourne tout les Agents)

const getAllAgents = (req, res) => {

    //Récupérer le nom de l'Agent de l'url
    const nom = req.query.nom;

    //Créer la variable condition
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;
  
    Agent.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Une erreur est survenue lors de la récupération des Agents."
        });
    });
};

/**
 * Création d'un Agent
 * @param {*} req la requete
 * @param {*} res la reponse
 */
//Création d'un Agent

const createAgent = (req, res) => {
          
    //Initialiser les attributs de l'Agent à créer
    const agent = {
        //idAgentMaintenance:req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motDePasse: req.body.motDePasse,
        salaire: req.body.salaire   
    };

    //Validation de l'email de l'Agent à créer
    if(validator.isEmail(agent.email)===false){
        res.status(500).send({
            message:"L'email est non valide!"             
        });
        return;
    }else{
        if(agent.nom==undefined || agent.prenom==undefined){
            res.status(500).send({
                message:"Les champs nom et prénom sont requis!"             
            });
            return;
        }else{
            //Vérifier si les attributs 'nom' et 'prénom' ne sont pas vides
            if((validator.isEmpty(agent.nom)) || (validator.isEmpty(agent.prenom))){
                res.status(500).send({
                    message:"Le champ nom et prénom ne peuvent pas etre vides!"             
                });
                return;
            }else{
                if(!passwdValidator.validate(agent.motDePasse)){
                    res.status(500).send({
                        message:"Mot de passe invalide!",
                    });
                    return;
                }else{
                    //hasher le mot de passe
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(agent.motDePasse, salt);
                    agent.motDePasse= hash;
                    //Créer l'Agent
                    Agent.create(agent)
                    .then(data => {
                        //Si la création réussit on affiche les champs de l'agent créé
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Une erreur est survenue lors de la création de l'Agent!"
                        });
                    });
                }
            }
        }
    }     
};


/**
 * Modification d'un Agent
 * @param {*} req la requete
 * @param {*} res la reponse
 */
//Modification d'un Agent

const updateAgent = (req, res) => {

    //Récupérer l'id de l'Agent à modifier de l'url
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

    //Modifier l'Agent
    Agent.update(req.body, {
        where: { idAgentMaintenance: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "L'Agent a bien été modifié!"
            });
        }else{
            res.send({
                message: `Agent avec id=${id} non modifié. Peut etre l'Agent n'a pas été trouvé!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la modification de l'Agent avec l'id=" + id
        });
    });
};

/**
 * Supprimer un Agent
 * @param {*} req la requete
 * @param {*} res la reponse
 */
//Supprimer un Agent

const deleteAgent = (req, res) => {

    //Récupérer l'id de l'Agent à modifier de l'url
    const id = req.params.id;
  
    Agent.destroy({
        where: { idAgentMaintenance: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Agent a été supprimé!"
            });
        }else{
            res.send({
                message: `Agent avec id=${id} non supprimé. Peut etre l'Agent n'a pas été trouvé!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la suppression de l'Agent avec l'id=" + id
        });
    });
};

/**
 * Supprimer tout les Agents 
 * @param {*} req la requete
 * @param {*} res la reponse
 */
//Supprimer tout les Agents 

const deleteAllAgents = (req, res) => {

    Agent.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Agents ont été supprimés avec succés!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la suppression!"
        });
    });
};

// Retourne la somme et la moyenne des salaires pour les agents de maintenance
const getSumAvgSalaries = async (req,res) =>{

    // verify access
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
		// Only admin can create Vehicule
  
		if (role != "administrateur") {
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
    
    try{
        let sum_salaries = 0,count_salaries=0
        sum_salaries  = await Agent.sum('salaire')
        count_salaries = await Agent.count('salaire')
        if(sum_salaries>0 && count_salaries>0){
            res.send({sum: sum_salaries,avg:sum_salaries/count_salaries})
        }
        else{
            res.status(404).send({
                error: 'not_found',
                message: 'No content',
                status: 404,
            })
        }
        

    }
    catch(err){
        res.status(500).send({
            error: err.message || 'Some error occured while getting salaries'
        });
    }
}

export default {
    createAgent,
    getAllAgents,
    getAgent,
    updateAgent,
    deleteAgent,
    deleteAllAgents,
    getSumAvgSalaries
};