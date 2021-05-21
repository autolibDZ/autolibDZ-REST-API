const db = require("../models");
const Borne = db.borne;
/**
 * Create and save a new borne in database
 * @param {*} req The request
 * @param {*} res The response
 */
// Create and Save a new Borne

const createBorne = async (req, res) => {


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

    const data = await Borne.findAll({ attributes: [[Borne.sequelize.fn('DISTINCT', Borne.sequelize.col('wilaya')), 'wilaya']] });

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

    let wilaya = req.params.wilaya

    if (wilaya == "all") {

      const data = await Borne.findAll({ attributes: [[Borne.sequelize.fn('DISTINCT', Borne.sequelize.col('commune')), 'commune']] });

      if (data.length != 0) {

        res.send(data);


      } else {
        res.status(404).send({

          message: "No Commune found!"

        })

      }

    } else {

      const data = await Borne.findAll({ attributes: [[Borne.sequelize.fn('DISTINCT', Borne.sequelize.col('commune')), 'commune']], where: { wilaya: wilaya } });

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

export default {
  createBorne,
  getFilteredBornes,
  getBorne,
  getAllBornes,
  getWilaya,
  getCommune
}