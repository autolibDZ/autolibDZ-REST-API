const db = require("../models");
const Borne = db.bornes;

// Create and Save a new Borne

const createBorne = async (req, res) => {

  // Validate request

  if (!req.body.idBorne) {

    res.status(400).send({

      message: "Content can not be empty!"

    });

    return;
  }

  // Create a Borne

  const borne = {

    idBorne: req.body.idBorne,
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

    const data = await Borne.create(borne)

    console.log(data);

    res.send(data);

  }
  catch (err) {

    res.status(500).send({

      error: err.message || "Some error occurred while creating the Borne."

    });

  }

};

//Returne list of Bornes

const listBorne = async (req, res) => {

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

//Returne borne with idBorne = id

const oneBorne = async (req, res) => {


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

        message: "Borne with id" + id + " does not exist"

      })
    }

  }
  catch (err) {

    res.status(500).send({

      error: err.message || "Some error occurred while getting Borne."

    });
  }

};

export default {
  createBorne,
  listBorne,
  oneBorne
}