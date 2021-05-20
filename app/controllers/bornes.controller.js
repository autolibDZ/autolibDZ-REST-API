const db = require("../models");
const Borne = db.borne;
const Vehicule = db.vehicules;

/**
 * Create and save a new borne in database
 * @param {*} req The request
 * @param {*} res The response
 */
// Create and Save a new Borne

const createBorne = async (req, res) => {


  // Create a Borne

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
        nbVehicules: req.body.nbVehicules,
        nbPlaces: req.body.nbPlaces
      }

    })

    if (result.length > 0) {
      res.status(400).send({

        message: "Borne already exists!"

      })
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
 */

//Returne list of Bornes

const getFilteredBornes = async (req, res) => {

  try {

    // Get all bornes in database

    if (req.body.filter == "") {

      const data = await Borne.findAll()

      console.log(data)

      if (data != null && data.length != 0) {

        res.send(data);

      } else {

        res.status(404).send({

          message: "Borne table is empty!"

        })
      }

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


  // Validate request

  if (!req.params.id) {

    res.status(400).send({

      message: "params 'id' can not be empty!"

    });

    return;
  }

  try {
    const id = req.params.id;

    const data = await Borne.findByPk(id)

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

    const data = await Borne.findAll()

    //console.log(data)

    if (data != null && data.length != 0) {

      res.send(data);

    } else {

      res.status(404).send({

        message: "Borne table is empty!"

      })
    }

  } catch (err) {
    res.status(500).send({

      error: err.message || "Some error occurred while getting Bornes."

    });
  }



};



const getVehiclesOfABorne = async (req, res) => {

  try {
    const vehicules = await Vehicule.findAll({
      where: {
        idBorne: req.params.id,
      },
    });
    if (vehicules.length <= 0) {
      res.status(404).send({
        error: `No vehicles in the borne with id: ${req.params.id}`
      });
    } else {
      res.status(200).send(vehicules);
    }
  } catch (err) {
    res.status(500).send({
      error: err.message || 'Some error occured while retreiving vehicules borne id: ' + req.params.id
    });
  }
};

export default {
  createBorne,
  getFilteredBornes,
  getBorne,
  getAllBornes,
  getVehiclesOfABorne
}
