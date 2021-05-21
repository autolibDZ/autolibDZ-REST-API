const db = require("../models");
const Identite = db.identites;
const Operator = db.operateur;
const Locataire = db.locataire;

// Create and Save a new Vehicule
const createIdentite = async (req, res) => {
    // Validate request
    if (!req.body.numeroPermis) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create an identite
    const identite = {
        numeroPermis: req.body.numeroPermis,
        photo: req.body.photo,
        valide: req.body.valide,
        idLocataire: req.body.idLocataire,
        idOperateur: req.body.idOperateur
    };

    // Ajout d'une identité à la base de données
    try{
      data = await Identite.create(identite)
     .then(data => {
      res.send(data);
     }); 
    }
    catch(err){
        res.status(500).send({
            error : err.message || "Some error occurred while creating the Identity."
        });
    }
     
  };

  // Suppresion d'une identité 
  const deleteIdentite = async (req, res) => {
      const numeroPermis = req.params.numeroPermis;
     

      Identite.destroy({
        where: { numeroPermis: numeroPermis }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Identity was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Identity with licence driver=${numeroPermis}. Maybe identity was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
          });
        });
    };

 // valider une identité
  const valider= async (req, res) => {
    const numeroPermis = req.params.numeroPermis;
  
    req.body = {
        valide: 1
    }

    Identite.update(req.body, {
      where: { numeroPermis: numeroPermis }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "identity was validated successfully."
          });
        } else {
          res.send({
            message: `Cannot validate identity with numPermis=${numeroPermis}. Maybe Identity was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error validating identity with numPermis=" + numeroPermis
        });
      });
  };

  const invalider= async (req, res) => {
    const numeroPermis = req.params.numeroPermis;
  
    req.body = {
        valide: 0
    }

    Identite.update(req.body, {
      where: { numeroPermis: numeroPermis }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message:  "identity was invalidated successfully."
          });
        } else {
          res.send({
            message: `Cannot invalidate identity with numPermis=${numeroPermis}. Maybe Identity was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error invalidating identity with numPermis=" + numeroPermis
        });
      });
  };

  //Afficher les informations de l'opérateur ayant validé l'identité
  const getOperatorOfIdentity = async (req, res) =>{
        //Récupérer le numéro de permis validé
    const numeroPermis = req.params.numeroPermis;
    Identite.findByPk(numeroPermis)
    .then(data => {
        const idOperateur = data.dataValues.idOperateur;
        Operator.findByPk(idOperateur)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la récupération de l'Operateur ayant validé le permis =" + numeroPermis
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la récupération de l'Operateur ayant validé le permis =" + numeroPermis
        });
    });
  }

    //Afficher les informations de l'opérateur ayant validé l'identité
    const getLocataireOfIdentity = async (req, res) =>{
        //Récupérer le numéro de permis validé
    const numeroPermis = req.params.numeroPermis;
    Identite.findByPk(numeroPermis)
    .then(data => {
        const idLocataire = data.dataValues.idLocataire;
        Locataire.findByPk(idLocataire)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la récupération de l'Operateur ayant validé le permis =" + numeroPermis
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la récupération de l'Operateur ayant validé le permis =" + numeroPermis
        });
    });
  }






  // Afficher les détails d'un seul véhicule 
  const getOneIdentite= async (req, res) => {
    const numeroPermis = req.params.numeroPermis;
  
    Identite.findByPk(numeroPermis)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Identity with numeroPermis=" + numeroPermis
        });
      });
  };

  // Afficher les détails de tous les véhicules Get all from database 

  const getAllIdentite = async (req,res)=> {
    
    Identite.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error while retrieving identities"
      });
    });
  }


const selectIdentitiesOfAGivenOperateur = async (req, res) => {
	try {
		const identities = await Identite.findAll({
			where: {
				idOperateur: +req.params.id,
			},
		});
		res.status(200).send(identities);
	} catch (err) {
		res.status(500).send({
			error:
				err.message ||
				'Some error occured while retreiving identities operator id: ' +
					req.params.id,
		});
	}
};

export default {
    selectIdentitiesOfAGivenOperateur,
    createIdentite, 
    deleteIdentite,
    getAllIdentite,
    getOneIdentite,
    getOperatorOfIdentity,
    getLocataireOfIdentity,
    valider,
    invalider
};
