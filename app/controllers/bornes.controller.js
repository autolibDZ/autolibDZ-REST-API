const db = require("../models");
const Borne = db.borne;
const { Op } = require("sequelize");
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
 * body elements : if nothing is provided it matches all
 * wilaya 
 * nomBorne
 * commune
 * nbVehicules
 * nbVehiculesOp : > , < = the default is >
 * nbPlaces
 * nbPlacesOp : > , < = the default is >
 */

//Returne list of Bornes

const getFilteredBornes = async (req, res) => {

  if (!req.body) {
		res.status(400).send({
			message: "body can not be empty!",
		});
		return;
	}

  const ops = ['<' , '>' , '=']

  if (req.body.nbPlacesOp != null && ! ops.includes(req.body.nbPlacesOp)) {
		res.status(400).send({
			message: "nbPlacesOp must be > , < or = ",
		});
		return;
	}

  if (req.body.nbVehiculesOp != null && ! ops.includes(req.body.nbVehiculesOp)) {
		res.status(400).send({
			message: "nbVehiculesOp must be > , < or = ",
		});
		return;
	}

  try {
    
    // setting the operator < , > , =
    const nbVehiculesOperator = (req.body.nbVehiculesOp != null) ? req.body.nbVehiculesOp :  '>'
    const nbPlacesOperator = (req.body.nbPlacesOp != null) ? req.body.nbPlacesOp :  '>'

    // setting squelize Op

    var nbPlacesSquelizeOp;

    if(nbPlacesOperator == '>'){
      nbPlacesSquelizeOp = Op.gt
    }else if(nbPlacesOperator == '<'){
      nbPlacesSquelizeOp = Op.lt
    }else{
      nbPlacesSquelizeOp = Op.eq
    }

    var nbVehiculesSquelizeOp ;

    if(nbVehiculesOperator == '>'){
      nbVehiculesSquelizeOp = Op.gt
    }else if(nbVehiculesOperator == '<'){
      nbVehiculesSquelizeOp = Op.lt
    }else{
      nbVehiculesSquelizeOp = Op.eq
    }

    const bornes = await Borne.findAll({
			where: {
				nomBorne: {
          [Op.like] : (req.body.nomBorne != null) ? req.body.nomBorne :  '%'
        },
        wilaya: {
          [Op.like] : (req.body.wilaya != null) ? req.body.wilaya :  '%'
        },
        commune: {
          [Op.like] : (req.body.commune != null) ? req.body.commune :  '%'
        },
        nbVehicules: {
          [nbVehiculesSquelizeOp] : (req.body.nbVehicules != null) ? req.body.nbVehicules :  0
        },
        nbPlaces: {
          [nbPlacesSquelizeOp] : (req.body.nbPlaces != null) ? req.body.nbPlaces :  0
        }
			},
			
		});

     if (bornes.length != 0) {
	        res.send(bornes);
	    } else {
	        res.status(404).send({
	            error: 'there is no Born that matches your filter',
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

export default {
  createBorne,
  getFilteredBornes,
  getBorne,
  getAllBornes
}
