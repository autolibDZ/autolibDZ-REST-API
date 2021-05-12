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

    // Save Vehicule in the database
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
  ///// 
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
  
  export default {
    createVehicule, 
    deleteVehicule
  }