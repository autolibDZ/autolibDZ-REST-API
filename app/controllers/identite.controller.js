const db = require("../models");
const Identite = db.identites;
const Operator = db.operateur;
const Locataire = db.locataire;

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// cloudinary configuration
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});


/**
 * Creer une identité
 * @param {*} req la requete
 * @param {*} res la reponse
 */
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
        idOperateur: req.body.idOperateur,
        idCloudinary: '',
        secureUrl:''
    };

    // Ajout d'une identité à la base de données
    if(identite.idLocataire==undefined || identite.idOperateur==undefined){
      res.status(500).send({
          message:"Les champs idLocataire et idOperateur sont requis!"             
      });
      return;
    }
    else{
      try{
        // upload image to cloudinary here
        if (req.body.photo) {
            const image = req.body.photo;
            try {
              ress = await cloudinary.uploader.upload(req.body.photo).then((result) => {
                identite.idCloudinary = result.public_id;
                identite.secureUrl = result.secure_url;
                console.log(result)
            });
            } catch (error) {
                console.log(error);
              }
            }else{
              res.status(500).send({
                message:"Vous devez entrez une image!"             
            });
            return;
            }

            if (req.body.selfie) {
              const image = req.body.photo;
              try {
                ress = await cloudinary.uploader.upload(req.body.photo).then((result) => {
                  identite.idCloudinaryPhotoSelfie = result.public_id;
                  identite.secureUrlPhotoSelfie = result.secure_url;
                  console.log(result)
              });
              } catch (error) {
                  console.log(error);
                }
              }else{
                res.status(500).send({
                  message:"Vous devez entrez une image de votre visage dans la borne!"             
              });
              return;
              }
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
      const numeroPermis = req.params.numeroPermis;
     

      Identite.destroy({
        where: { numeroPermis: numeroPermis }
      })
        .then(num => {
          if (num == 1) {
            res.status(200).send({
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

/**
 * valider une identité
 * @param {*} req la requete
 * @param {*} res la reponse
 */
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
          res.status(200).send({
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
/**
 * Invalider une identité
 * @param {*} req la requete
 * @param {*} res la reponse
 */
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
          res.status(200).send({
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





/**
 * Afficher les détails d'une seule identité
 * @param {*} req la requete
 * @param {*} res la reponse
 */
const getOneIdentite= async (req, res) => {
  const numeroPermis = req.params.numeroPermis;
  
  Identite.findByPk(numeroPermis)
  .then(data => {
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Identity with numeroPermis=" + numeroPermis
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
 * GET All Identities for a certain operator
 * @param {*} req la requete
 * @param {*} res la reponse
 */
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

/**
 * GET All Identity for a certain locataire
 * @param {*} req la requete
 * @param {*} res la reponse
 */
 const selectIdentitieOfAGivenLocataire = async (req, res) => {
	try {
		const identities = await Identite.findAll({
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
    selectIdentitiesOfAGivenOperateur,
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
