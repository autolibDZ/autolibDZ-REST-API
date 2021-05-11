const db = require('../models');
const Locataire = db.locataires;
const Op = db.Sequelize.Op;

// Create and Save a new Locataire
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Locataire
  const locataire = {
    Nom: req.body.nom,
    Prenom: req.body.prenom,
    Email: req.body.email,
    MotDePasse: req.body.motdepasse,
    Active: req.body.activ ? req.body.activ : false
  };

  // Save Locataire in the database
  Locataire.create(locataire)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Locataire."
      });
    });
};


// Retrieve all Locataires from the database.
exports.findAll = (req, res) => {
    Locataire.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// Find a single Locataire with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

    Locataire.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Locataire with id=" + id
        });
      });
};

// Update a Locataire by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
    Locataire.update(req.body, {
      where: { IdUtilisateur: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Locataire was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Locataire with id=${id}. Maybe Locataire was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Locataire with id=" + id
        });
      });
};

// Delete a Locataire with the specified id in the request
exports.delete = (req, res) => {
  
};
