const db = require("../models");
const Borne = db.borne;
const Vehicule = db.vehicules;
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
/**
 * Create and save a new borne in database
 * @param {*} req The request
 * @param {*} res The response
 */
// Create and Save a new Borne

const createBorne = async (req, res) => {

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

      // Only admin can create Borne

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


  // Create a Borne

  if (!req.body.nomBorne || !req.body.wilaya || !req.body.commune || !req.body.latitude || !req.body.longitude || !req.body.nbVehicules || !req.body.nbPlaces) {
    res.status(400).send({
      message: "parameters can't be empty!"
    })
    return;
  }

  const borne = {
    nomBorne: req.body.nomBorne,
    wilaya: req.body.wilaya,
    commune: req.body.commune,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    nbVehicules: req.body.nbVehicules,
    nbPlaces: req.body.nbPlaces
  };


  // Save Borne in the database

  try {
    let result = await Borne.findAll({
      where: {
        nomBorne: req.body.nomBorne,
        wilaya: req.body.wilaya,
        commune: req.body.commune,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        //  nbVehicules: req.body.nbVehicules,
        //  nbPlaces: req.body.nbPlaces,
        // etat:1
      }

    })
    console.log("resultt" + result.length);
    if (result.length > 0) {
      if (result[0].etat == 0) {
        const updatedBorne = Borne.update(
          {
            etat: 1,
            nbVehicules: req.body.nbVehicules,
            nbPlaces: req.body.nbPlaces,
          },

          {
            where: {
              nomBorne: req.body.nomBorne,
              wilaya: req.body.wilaya,
              commune: req.body.commune,
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              // nbVehicules: req.body.nbVehicules,
              //   nbPlaces: req.body.nbPlaces,
              etat: 0
            }
          }
        )
        result[0].etat = 1
        res.send(result)
      } else {
        res.status(400).send({

          message: "Borne already exists!"

        })
      }

    } else {
      let data = await Borne.create(borne)
      res.send(data);
    }
  }
  catch (err) {

    res.status(500).send({

      error: err.message || "Some error occurred while creating the Borne."

    });

  }

};
/**
 * Return a list of borne according to parameter filter in body request
 * @param {*} req The request
 * @param {*} res The response
 * body elements : if nothing is provided it matches all
 * wilaya 
 * nomBorne
 * commune
 * nbVehiculesMax
 * nbVehiculesMin
 * nbPlaces
 * nbPlacesOp : > , < = the default is >
 */

//Returne list of Bornes

const getFilteredBornes = async (req, res) => {
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

      // Only admin can create Borne

      if (role != "administrateur" && role != "agent" && role != "locataire" && role != "dirigeant") {

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


  if (!req.body) {
    res.status(400).send({
      message: "body can not be empty!",
    });
    return;
  }

  const ops = ['min', 'max']

  if (req.body.nbPlacesOp != null && !ops.includes(req.body.nbPlacesOp)) {
    res.status(400).send({
      message: "nbPlacesOp must be min or max",
    });
    return;
  }

  try {

    // setting the operator < , > , =
    const nbPlacesOperator = (req.body.nbPlacesOp != null) ? req.body.nbPlacesOp : 'min'

    // setting squelize Op
    var nbPlacesSquelizeOp;

    if (nbPlacesOperator == 'min') {
      nbPlacesSquelizeOp = Op.gte
    } else if (nbPlacesOperator == 'max') {
      nbPlacesSquelizeOp = Op.lte
    }


    const nbVehiculesMax = (req.body.nbVehiculesMax != null) ? req.body.nbVehiculesMax : 99999
    const nbVehiculesMin = (req.body.nbVehiculesMin != null) ? req.body.nbVehiculesMin : 0


    const bornes = await Borne.findAll({
      where: {
        nomBorne: {
          [Op.like]: (req.body.nomBorne != null) ? req.body.nomBorne : '%'
        },
        wilaya: {
          [Op.like]: (req.body.wilaya != null) ? req.body.wilaya : '%'
        },
        commune: {
          [Op.like]: (req.body.commune != null) ? req.body.commune : '%'
        },
        nbVehicules: {
          [Op.between]: [nbVehiculesMin, nbVehiculesMax]
        },
        nbPlaces: {
          [nbPlacesSquelizeOp]: (req.body.nbPlaces != null) ? req.body.nbPlaces : 0

        },
        etat: 1
      },
    });

    if (bornes.length != 0) {
      res.send(bornes);
    } else {
      res.status(404).send({
        error: 'there is no Borne that matches your filter',
      });
    }

  }
  catch (err) {

    res.status(500).send({

      error: err.message || "Some error occurred while getting list of Borne."

    });
  }

};
/**
 * Return a borne with the specified ID in request body
 * @param {*} req The request
 * @param {*} res The response
 */
//Returne borne with idBorne = id

const getBorne = async (req, res) => {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  console.log("la val du token " + token);
  if (token == null) {

    res.status(403).send({
      message: "Access Forbidden,invalide token",
    });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("in user" + user)
    if (user != undefined) {

      const role = user.role

      // Only admin can create Borne

      if (role != "administrateur" && role != "agent" && role != "locataire" && role != "dirigeant") {
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

  if (!req.params.id) {

    res.status(400).send({

      message: "params 'id' can not be empty!"

    });

    return;
  }

  try {
    const id = req.params.id;

    const data = await Borne.findAll({
      where: {
        idBorne: id,
        etat: 1
      }

    })

    console.log(data)

    if (data != null && data.length != 0) {

      res.send(data);

    } else {

      res.status(404).send({

        message: "Borne with id " + id + " does not exist"

      })
    }

  }
  catch (err) {

    res.status(500).send({

      error: err.message || "Some error occurred while getting Borne."

    });
  }

};
/**
 * Return all bornes in database
 * @param {*} req request 
 * @param {*} res response
 */
const getAllBornes = async (req, res) => {
  try {

    //Verify access
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



        if (role != "administrateur" && role != "agent" && role != "locataire" && role != "dirigeant") {

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


    const data = await Borne.findAll({
      where: {
        etat: 1
      }
    })

    //console.log(data)

    if (data != null && data.length != 0) {

      res.send(data);
      return;

    } else {

      res.status(404).send({

        message: "Borne table is empty!"

      })
      return;
    }

  } catch (err) {
    res.status(500).send({

      error: err.message || "Some error occurred while getting Bornes."

    });
    return;
  }



};
/**
 * Return the list of all wilayas 
 * @param {*} req request
 * @param {*} res response
 */

const getWilaya = async (req, res) => {
  try {

    // Verify access
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


        if (role != "administrateur" && role != "agent" && role != "locataire" && role != "dirigeant") {

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


    const data = await Borne.findAll({ attributes: [[Borne.sequelize.fn('DISTINCT', Borne.sequelize.col('wilaya')), 'wilaya']], where: { etat: 1 } });

    if (data.length != 0 && data != null) {

      res.send(data);


    } else {
      res.status(404).send({

        message: "No wilaya found!"

      })

    }


  } catch (err) {
    res.status(500).send({

      error: err.message || "Some error occurred while getting list of Wilaya."

    });


  }

};
/**
 * Return all communes in database or communes by wilaya
 * @param {*} req 
 * @param {*} res 
 */
const getCommune = async (req, res) => {
  try {

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

        if (role != "administrateur" && role != "agent" && role != "locataire" && role != "dirigeant") {

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


    let wilaya = req.params.wilaya

    if (wilaya == "all") {

      const data = await Borne.findAll({ attributes: [[Borne.sequelize.fn('DISTINCT', Borne.sequelize.col('commune')), 'commune']], where: { etat: 1 } });

      if (data.length != 0) {

        res.send(data);


      } else {
        res.status(404).send({

          message: "No Commune found!"

        })

      }

    } else {

      const data = await Borne.findAll({ attributes: [[Borne.sequelize.fn('DISTINCT', Borne.sequelize.col('commune')), 'commune']], where: { wilaya: wilaya, etat: 1 } });

      if (data.length != 0) {

        res.send(data);


      } else {

        res.status(404).send({

          message: "No Commune found for wilaya :" + wilaya


        })

      }

    }


  } catch (err) {
    res.status(500).send({

      error: err.message || "Some error occurred while getting list of Communes"

    });
  }
};

/**
 * Return all Vehicles in borne of idBorne=id
 * @param {*} req request 
 * @param {*} res response
* @returns {vehicules} liste of vehicles
*/


const getVehiclesInABorne = async (req, res) => {

  // Verify access
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

      if (role != "administrateur" && role != "agent" && role != "locataire" && role != "dirigeant") {

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
  try {
    const vehicules = await Vehicule.findAll({
      where: {
        idBorne: req.params.id,
        etat: "en service"
      }
    });
    if (vehicules.length <= 0) {
      res.status(404).send({
        error: "No vehicles in the borne with id:" + req.params.id
      });
    } else {
      res.status(200).send(vehicules);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting vehicles in borne id: " + req.params.id
    });
  }
};


/**
 * Update borne with idBorne= params.id
 * @param {*} req request 
 * @param {*} res response
*/

const updateBorne = async (req, res) => {

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

      // Only admin can update Borne

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

  try {
    const borne = await Borne.findOne({
      where: {
        idBorne: req.params.id
      }
    });
    if (borne) {    // Check if record exists in db
      let updatedBorne = await borne.update(req.body)
      if (updatedBorne) {
        res.status(200).send({
          data: updatedBorne,
          message: 'Borne was updated successfully.',
        });
      } else {
        res.status(404).send({
          message: "Cannot update borne with id: " + id
        });
      }
    } else {
      res.status(404).send({
        error: "not_found",
        message: "Borne not found"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while updating borne with id: " + req.params.id
    });
  }
};
/**
 * Delete Borne by ID
 * @param {*} req request
 * @param {*} res response
 * 
 */
//Delete borne from database
const deleteBorne = async (req, res) => {

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

      // Only admin can delete Borne

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

  try {
    const data = await Borne.update(
      { etat: 0 },
      {
        where: {
          idBorne: req.params.id,
          etat: 1
        }
      }
    )
    if (data == 1) {
      res.status(201).send({
        message: "Borne with id : " + req.params.id + " was deleted succefully!"
      })
      //update list of véhicule
      const vehicule = await Vehicule.update(
        { idBorne: null },
        { where: { idBorne: req.params.id } }
      )


    } else {
      res.status(404).send({

        message: "Borne with id : " + req.params.id + " does not exist!"

      })
    }

  } catch (err) {
    res.status(500).send({
      error: err.message || "Some error occured while deleting borne with id: " + req.params.id
    });
  }



};

export default {
  createBorne,
  getFilteredBornes,
  getBorne,
  getAllBornes,
  getVehiclesInABorne,
  getWilaya,
  getCommune,
  updateBorne,
  deleteBorne
}
