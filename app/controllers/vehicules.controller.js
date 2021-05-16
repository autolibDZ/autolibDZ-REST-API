const db = require("../models");
const Vehicule = db.vehicules;

// Create and Save a new Vehicule
const createVehicule = async (req, res) => {
    // Validate request
    if (!req.body.numChassis) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Vehicule
    const vehicule = {
      numChassis: req.body.numChassis,
      numImmatriculation : req.body.numImmatriculation,
      modele: req.body.modele,
      marque: req.body.marque,
      couleur:  req.body.couleur, 
      etat: req.body.etat, 
      tempsDeRefroidissement: req.body.tempsDeRefroidissement, 
      pressionHuileMoteur: req.body.pressionHuileMoteur, 
      chargeBatterie: req.body.chargeBatterie, 
      anomalieCircuit: req.body.anomalieCircuit, 
      pressionPneus: req.body.pressionPneus, 
      niveauMinimumHuile: req.body.niveauMinimumHuile, 
      regulateurVitesse: req.body.regulateurVitesse, 
      limiteurVitesse: req.body.limiteurVitesse, 
    };

    // Ajout d'un véhicule à la base de données
    try{
      data = await Vehicule.create(vehicule)
     .then(data => {
      res.send(data);
     }); 
    }
    catch(err){
        res.status(500).send({
            error : err.message || "Some error occurred while creating the Vehicule."
        });
    }
     
  };

  // Suppresion d'un véhicule 
  const deleteVehicule = async (req, res) => {
      const id = req.params.id;
    
      console.log(id); 

      Vehicule.destroy({
        where: { numChassis: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Vehicule was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Vehicule with id=${id}. Maybe Vehicule was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
          });
        });
    };

    // Mise à jour d'un véhicule 
  const updateVehicule= async (req, res) => {
    const id = req.params.id;
  
    Vehicule.update(req.body, {
      where: { numChassis: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Vehicule was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Vehicule with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Vehicule with id=" + id
        });
      });
  };

  // Afficher les détails d'un seul véhicule 
  const getOneVehicule= async (req, res) => {
    const id = req.params.id;
  
    Vehicule.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };

  // Afficher les détails de tous les véhicules Get all from database 

  const getAllVehicule = async (req,res)=> {
    // Retrieve all Tutorials from the database.
    
    Vehicule.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
  }
  
  //Afficher les vehicules selon un état donné (Réservé, non réservé, en panne, en cirulcation ou en maintenance) 
 /* const getVehiculeByCondition = (req, res) => {
    const etat = req.query.etat;
    var condition = etat ? { etat: { [Op.like]: `%${etat}%` } } : null;
  
    Vehicule.findAll({ where: condition })
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

*/ 
  export default {
    createVehicule, 
    deleteVehicule, 
    updateVehicule,
    getOneVehicule, 
    getAllVehicule,
    //getVehiculeByCondition
  }