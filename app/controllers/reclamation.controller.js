const db = require("../models");
const Reclamation = db.reclamation;
var jwt = require("jsonwebtoken");
let sequelize = require("sequelize");

/**
 * Create and save a new claim in database
 * @param {*} req The request
 * @param {*} res The response
 */
// Create and Save a new Claim

const createReclamation = async (req, res) => {
   /* // verify access
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
    
      if (role != "locataire") {
    
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
*/
  // Create a Claim

  if (!req.body.description || !req.params.idLocataire || !req.body.type) {
    res.status(400).send({
      message: "parameters can't be empty!"
    })
    return;
  }

  const reclamation = {
    description: req.body.description,
    idLocataire: req.params.idLocataire,
    type: req.body.type, 
  };

  // Save Claim in the database

  try {
    let result = await Reclamation.findAll({
      where: {
        description: req.body.description,
      }
    })
    if (result.length > 0) {
      res.status(400).send({
        message: "Reclamation already exists!"
      })
    } else {
      let data = await Reclamation.create(reclamation)
      res.send(data);
    }
  }
  catch (err) {

    res.status(500).send({

      error: err.message || "Some error occurred while creating the Claim."

    });

  }

};

/**
 * Return a claim with the specified ID in request body
 * @param {*} req The request
 * @param {*} res The response
 */
//Return claim with idReclamation = id

const getReclamationDetails = async (req, res) => {

     /* // verify access
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
      
        if (role != "administrateur"  && role != "dirigeant") {
      
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
      
      }*/ 

  if (!req.params.id) {

    res.status(400).send({

      message: "params 'id' can not be empty!"

    });

    return;
  } 

  try {
    const id = req.params.id;

    const data = await Reclamation.findByPk(id)

    if (data != null && data.length != 0) {

      res.send(data);

    } else {

      res.status(404).send({

        message: "Reclamation with id " + id + " does not exist"

      })
    }
  }
  catch (err) {

    res.status(500).send({

      error: err.message || "Some internal error occurred while getting Reclamation."
    });
  }

};
/**
 * Return all reclamations in database
 * @param {*} req request 
 * @param {*} res response
 */
const getAllReclamations = async (req, res) => {

  /* // verify access
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
  
		if (role != "administrateur" && role != "dirigeant") { 
  
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
  
	}*/ 

  try {

    const data = await Reclamation.findAll()
    if (data != null && data.length != 0) {

      res.send(data);
      return;

    } else {

      res.status(404).send({

        message: "Reclamation table is empty!"

      })
      return;
    }

  } catch (err) {
    res.status(500).send({

      error: err.message || "Some error occurred while getting Reclamations."

    });
    return;
  }
};


/**
 * Delete a claim with the specified ID in request body
 * @param {*} req The request
 * @param {*} res The response
 */
//Delete claim with idReclamaton = id

const deleteReclamation = async (req, res) => {

     /*   // verify access
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
      
      } */ 
	const id = req.params.id;

	Reclamation.destroy({
		where: { idReclamation: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Claim was deleted successfully!',
				});
			} else {
				res.send({
					message: `Cannot delete Claim with id=${id}. Maybe Claim was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete Claim with id=' + id,
			});
		});
};

const countBugsByMonth = async(req, res) => {

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

  // Validate request
  if (!req.params.year) {
      res.status(400).send({
          message: "params 'year' can not be empty!",
      });
      return;
  }

  try {
      let year = req.params.year;
      const reclamations_par_mois = await Reclamation.findAll({
          attributes: [
              [sequelize.fn('date_part', 'month', sequelize.col('date')), 'month'],
              [sequelize.fn('COUNT', sequelize.col('idReclamation')), 'countReclamations'],
          ],
          where: {
            [sequelize.Op.and]:[
              sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('date')), year),
              { type: "bug" }
            ]
          },
          group: [sequelize.fn('date_part', 'month', sequelize.col('date'))],
          order: [sequelize.fn('date_part', 'month', sequelize.col('date'))],
      });
      if (reclamations_par_mois.length != 0) {
          res.send(reclamations_par_mois);
      } else {
          res.status(404).send({
              error: 'not_found',
              message: 'No content',
              status: 404,
          });
      }
  } catch (err) {
      res.status(500).send({
          error: err.message || 'Some error occured while counting bugs'
      });
  }
};

const getYears = async(req, res) => {

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
  
  //const maxYearsToGet=5

  try {
      const years = await Reclamation.findAll({
          attributes: [
              [sequelize.fn('date_part', 'year', sequelize.col('date')), 'year'],
          ],
          where:{type: "bug"},
          //order: [[sequelize.literal('"dateDebut"'), 'DESC']],
          group: [sequelize.fn('date_part', 'year', sequelize.col('date'))],
          order: [sequelize.fn('date_part', 'year', sequelize.col('date'))],
          //limit :maxYearsToGet
      });
      if (years.length != 0) {
          res.send(years);
      } else {
          res.status(404).send({
              error: 'not_found',
              message: 'No content',
              status: 404,
          });
      }
  } catch (err) {
      res.status(500).send({
          error: err.message || 'Some error occured while getting years'
      });
  }
};

export default {
    createReclamation,
    getReclamationDetails,
    getAllReclamations, 
    deleteReclamation,
    countBugsByMonth,
    getYears
}