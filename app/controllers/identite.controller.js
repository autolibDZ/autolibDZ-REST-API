const db = require("../models");
const Identite = db.identites;
const Operator = db.operateur;
const Locataire = db.locataire;

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// cloudinary configuration
/*cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});*/ 


/**
 * Creer une identité
 * @param {*} req la requete, on doit mettre dans body :- photo(pour photo du permis) -selfie(pour selfie du locataire) et idLocataire
 * @param {*} res la reponse
 */
const createIdentite = async (req, res) => {
    // Create an identite
    const identite = {
        idLocataire: req.body.idLocataire,
        idCloudinary: req.body.idPhoto,
        secureUrl:req.body.photo,
        idCloudinaryPhotoSelfie: req.body.idSelfie,
        secureUrlPhotoSelfie:req.body.selfie

    };

    // Ajout d'une identité à la base de données
    if(identite.idLocataire==undefined /* || identite.idOperateur==undefined*/){
      res.status(500).send({
          message:"Le champ idLocataire est requis!"             
      });
      return;
    }
    else{
      try{
        data = await Identite.create(identite)
       .then(data => {
        res.status(200).send(data);
       }); 
      }
      catch(err){
          res.status(500).send({
              error : err.message || "Some error occurred while creating the Identity."
          });
      }
    }
     
  };

/**
 * Supprimer une identité
 * @param {*} req la requete
 * @param {*} res la reponse
 */
  const deleteIdentite = async (req, res) => {
      const id = req.params.id;
     

      Identite.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.status(200).send({
              message: "Identity was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Identity with licence driver=${id}. Maybe identity was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
          });
        });
    };

/**
 * valider une identité en rendant le champ valide à 1
 * @param {*} req la requete
 * @param {*} res la reponse
 */
  const valider= async (req, res) => {
    const id = req.params.id;
  
    req.body = {
        valide: 1
    }

    Identite.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            message: "identity was validated successfully."
          });
        } else {
          res.send({
            message: `Cannot validate identity with numPermis=${id}. Maybe Identity was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error validating identity with numPermis=" + id
        });
      });
  };
/**
 * Invalider une identité en rendant le champ valide à 0
 * @param {*} req la requete
 * @param {*} res la reponse
 */
  const invalider= async (req, res) => {
    const id = req.params.id;
  
    req.body = {
        valide: 0
    }

    Identite.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            message:  "identity was invalidated successfully."
          });
        } else {
          res.send({
            message: `Cannot invalidate identity with numPermis=${id}. Maybe Identity was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error invalidating identity with numPermis=" + id
        });
      });
  };
/**
 * Afficher les informations de l'opérateur ayant validé l'identité
 * @param {*} req la requete
 * @param {*} res la reponse
 */
const getOperatorOfIdentity = async (req, res) =>{
  //Récupérer le numéro de permis validé
  const numeroPermis = req.params.numeroPermis;
  Identite.findByPk(numeroPermis)
  .then(data => {
    const idOperateur = data.dataValues.idOperateur;
    Operator.findByPk(idOperateur)
    .then(data => {
      res.status(200).send(data);
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


/**
 * Afficher les informations du locataire ayant l'identité
 * @param {*} req la requete
 * @param {*} res la reponse
 */

const getLocataireOfIdentity = async (req, res) =>{
  //Récupérer le numéro de permis validé
  const id = req.params.id;
  Identite.findByPk(id)
  .then(data => {
    const idLocataire = data.dataValues.idLocataire;
    console.log(idLocataire);
    Locataire.findByPk(idLocataire)
    .then(data => {
       res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération du locataire pour le permis=" + id
      });
    });
  })
  .catch(err => {
    res.status(500).send({
      message: "Erreur lors de la récupération de l'Operateur ayant validé le permis =" + id
    });
  });
}





/**
 * Afficher les détails d'une seule identité
 * @param {*} req la requete
 * @param {*} res la reponse
 */
const getOneIdentite= async (req, res) => {
  const id = req.params.id;
  
  Identite.findByPk(id)
  .then(data => {
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Identity with id=" + id
    });
  });
};



/**
 * GET All Identities 
 * @param {*} req la requete
 * @param {*} res la reponse
 */
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


/**
 * GET All Identity for a certain locataire
 * @param {*} req la requete
 * @param {*} res la reponse
 */
 const selectIdentitieOfAGivenLocataire = async (req, res) => {
	try {
		const identities = await Identite.findOne({
			where: {
				idLocataire: +req.params.id,
			},
		});
		res.status(200).send(identities);
	} catch (err) {
		res.status(500).send({
			error:
				err.message ||
				'Some error occured while retreiving identity of locataire id: ' +
					req.params.id,
		});
	}
};


export default {
    //selectIdentitiesOfAGivenOperateur,
    createIdentite, 
    deleteIdentite,
    getAllIdentite,
    getOneIdentite,
    getOperatorOfIdentity,
    getLocataireOfIdentity,
    valider,
    invalider,
    selectIdentitieOfAGivenLocataire
};
