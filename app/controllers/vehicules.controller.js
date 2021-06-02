const db = require('../models');
const { Sequelize } = require('sequelize');
const Vehicule = db.vehicules;
const Reservation = db.reservation;
const Borne = db.borne; 
const Locataire= db.locataire;
const Trajet= db.trajet;
const Op = Sequelize.Op;
var jwt = require("jsonwebtoken");


const cloudinary = require('cloudinary').v2;
require('dotenv').config();
let sequelize = require("sequelize");
/**
 * Create and save a new Vehicule in database
 * @param {*} req The request
 * @param {*} res The response
 */
// Create and Save a new Vehicule

const createVehicule = async (req, res) => {

	// verify access
	const authHeader = req.headers['authorization']
	console.log(authHeader);
	const token = authHeader && authHeader.split(' ')[1]
	console.log(token);
  
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
	if (!req.body.numChassis || !req.body.numImmatriculation || !req.body.modele || !req.body.marque || !req.body.couleur
		|| !req.body.etat || !req.body.idAgentMaintenance || !req.body.idBorne ) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
		return;
	}
	// Create a Vehicule
	const vehicule = {
		numChassis: req.body.numChassis,
		numImmatriculation: req.body.numImmatriculation,
		modele: req.body.modele,
		marque: req.body.marque,
		couleur: req.body.couleur,
		etat: req.body.etat,
		tempsDeRefroidissement: req.body.tempsDeRefroidissement,
		pressionHuileMoteur: req.body.pressionHuileMoteur,
		chargeBatterie: req.body.chargeBatterie,
		anomalieCircuit: req.body.anomalieCircuit,
		pressionPneus: req.body.pressionPneus,
		niveauMinimumHuile: req.body.niveauMinimumHuile,
		regulateurVitesse: req.body.regulateurVitesse,
		limiteurVitesse: req.body.limiteurVitesse,
		idBorne: req.body.idBorne, 
		idAgentMaintenance: req.body.idAgentMaintenance,
	    idCloudinary: req.body.idCloudinary, 
		secureUrl: req.body.secureUrl
	}; 

	// Ajout d'un véhicule à la base de données
	try {
		let result = await Vehicule.findAll({
			where: {
				numChassis: req.body.numChassis,
			},
		});
		if (result.length > 0) {
			res.status(400).send({
				message: 'Vehicule already exists!',
			});
		} else {
			let data;
			data = await Vehicule.create(vehicule).then((data) => {
				res.send(data);
			});
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occurred while creating the Vehicule.',
		});
	}
};

/**
 * Delete a vehicule with the specified ID in request body
 * @param {*} req The request
 * @param {*} res The response
 */
//Delete vehicule with numChassis = id

const deleteVehicule = async (req, res) => {
	const id = req.params.id;

	console.log(id);

	Vehicule.destroy({
		where: { numChassis: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Vehicule was deleted successfully!',
				});
			} else {
				res.send({
					message: `Cannot delete Vehicule with id=${id}. Maybe Vehicule was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete Vehicule with id=' + id,
			});
		});
};

/**
 * Update a Vehicule that has the specified ID in request body with data in request body
 * @param {*} req The request
 * @param {*} res The response
 */
//Update vehicule with numChassis = id
const updateVehicule = async (req, res) => {

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

	const id = req.params.id;
	Vehicule.update(req.body, {
		where: { numChassis: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Vehicule was updated successfully.',
				});
			} else {
				res.send({
					message: `Cannot update Vehicule with id=${id}. Maybe Vehicule was not found or req.body is empty!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating Vehicule with id=' + id,
			});
		});
};

/**
 * Return details of all vehicules thar are stored in database
 * @param {*} req request
 * @param {*} res response
 */

const getAllVehicule = async (req, res) => {

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
  
		if (role != "administrateur" && role != "agent") {
  
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


	Vehicule.findAll({
		where: {
			etat: {
			  [Op.ne]: "supprime", // Tous les véhicules sauf ceux qui sont supprimés
			},
		  },
	})  
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error retrieving all vehicules',
			});
		});
};

/**
 * This function displays the details of a given car, identified by it's num chassis
 * return 404 status with not_found error as json if it doesn't exist
 * return 200 status with the actual car oin json if it exists
 *
 * @param {*} req The request of the client
 * @param {*} res The response from the server
 * @param {*} next Used to move on to the next middleware
 */

const getVehiculeDetails = async (req, res, next) => {
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
  
		if (role != "administrateur" && role != "locataire" && role != "agent" ) {
  
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
		if (parseInt(req.params.id, 10)) {
			const vehicule = await Vehicule.findAll({
				where: {
					numChassis: +req.params.id,
				},
			});
			if (vehicule.length === 0) {
				// No content with that numChassis
				res.status(404).send({
					error: 'not_found',
					message: `No vehicule with such numero chassis: ${+req.params.id}`,
					status: 404,
				});
			} else {
				res.status(200).send(vehicule[0]);
			}
		} else next();
	} catch (err) {
		res.status(500).send({
			error:
				err.message || 'Some error occured while retreiving vehicule,s details',
		});
	}
};


/**
 * Get reservation history of the Vehicule that has the specified ID in request body 
 * @param {*} req The request
 * @param {*} res The response
 */
const getVehiculeReservations = async (req, res, next) => {

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
	const historytable= []; 
	try {
		if (parseInt(req.params.id, 10)) {
			const historiqueReservation = await Reservation.findAll({
				where: {
					idVehicule: +req.params.id,
				},
			});
			if (historiqueReservation.length === 0) {
				// Ce vehicule n'a aucune réservation 
				res.status(404).send({
					error: 'not_found',
					message: `Ce véhicule n'a aucune réservation en historique: ${+req.params.id}`,
					status: 404,
				});
			} else {

				var i=0;
				for ( i=0;i<historiqueReservation.length ; i++){
					 let reservationDetails={
							"idReservation": "", 
							"nomBorneDepart" : "",
							"wilayaBorneDepart":"",
							"nomBorneDestination" : "",
							"WilayaBorneDestination":"",
							"nomLocataire":"", 
							"prenomLocataire": "", 
							"etatReservation":"", 
							"dateDebut":"", 
							"dateFin":"", 
							"idTrajet":"", 
							"nbKm":"",
							"nbKmEstime":"", 
							"tempsEstime":"",
							"tempsReel":"",
							"prixEstime":"",
							"prixAPayer":""
						}; 
					   reservationDetails.idReservation=historiqueReservation[i].idReservation;
					   reservationDetails.etatReservation=historiqueReservation[i].etat;
					   reservationDetails.tempsEstime=historiqueReservation[i].tempsEstime;
					   reservationDetails.prixEstime=historiqueReservation[i].prixEstime; 
					   reservationDetails.nbKmEstime=historiqueReservation[i].distanceEstime; 
					
						//Récuperer le nom de la borne de départ 
						const result = await Borne.findAll({
							where: {
								idBorne: historiqueReservation[i].idBorneDepart,
							},
						}); 
							var rows = JSON.parse(JSON.stringify(result[0]));
							console.log(rows.nomBorne); 
							reservationDetails.nomBorneDepart=rows.nomBorne; 
							reservationDetails.wilayaBorneDepart=rows.wilaya; 

						// Récupérer le nom de la borne d'arrivée
						const result1 = await Locataire.findAll({
							where: {
								idLocataire: historiqueReservation[i].idLocataire,
							},
						}); 
							var rows1 = JSON.parse(JSON.stringify(result1[0]));
							reservationDetails.nomLocataire=rows1.nom;
							reservationDetails.prenomLocataire=rows1.prenom;

							const result2 = await Borne.findAll({
							where: {
								idBorne: historiqueReservation[i].idBorneDestination,
							},
						}); 	
							var rows2 = JSON.parse(JSON.stringify(result2[0]));
							reservationDetails.nomBorneDestination=rows2.nomBorne;
							reservationDetails.WilayaBorneDestination=rows2.wilaya; 

							if (reservationDetails.etatReservation=="Terminée" || reservationDetails.etatReservation=="Active" ){

								const result3 = await Trajet.findAll({
									where: {
										idReservation: historiqueReservation[i].idReservation,
									},
								}); 	
									var rows3 = JSON.parse(JSON.stringify(result3[0]));
									reservationDetails.idTrajet=rows3.idTrajet; 
									if(rows3.dateDebut != null) {reservationDetails.dateDebut= rows3.dateDebut }
									if(rows3.dateFin != null ) {	
										reservationDetails.dateFin= rows3.dateFin;
										reservationDetails.nbKm= rows3.kmParcourue;
										reservationDetails.tempsReel = rows3.tempsEstime;
										reservationDetails.prixAPayer= rows3.prixAPayer;
									}
							}
							historytable.push(reservationDetails); 		
					}
					res.send(historytable);
			}
		} else next();
	} catch (err) {
		res.status(500).send({
			error:
				err.message || 'Some error occured while retreiving vehicule"s reservation history',
		});
	}
};

const selectVehicuesOfAGivenAgent = async (req, res) => {
	try {
		if (parseInt(req.params.id, 10)) {
			const vehicules = await Vehicule.findAll({
				where: {
					idAgentMaintenance: +req.params.id,
				},
			});
			if (vehicules.length === 0) {
				// No content with that id
				res.status(404).send({
					error: 'not_found',
					message: `No content with such id: ${+req.params.id}`,
					status: 404,
				});
			} else {
				res.status(200).send(vehicules);
			}
			res.status(200).send(vehicules);
		} else done();
	} catch (err) {
		res.status(500).send({
			error:
				err.message ||
				'Some error occured while retreiving vehicules agent id: ' +
					req.params.id,
		});
	}
};

/**
 * This function gets fired on a PUT request to /api/vehicules/etat/:numChassis
 * the request should have an attribute 'etat' set to either 'en-service' or 'hors-service', no other values are accepted
 * returns a 404 status with not-found error message if the num chasiis given doesn't exist
 * returns an object {Updated rows, UpdatedVehicule} contained numer of rows affected (modified) and the actual cars which have been affected
 *
 * @param {*} req The client requeest
 * @param {*} res The server response
 */
const setEtatVehicule = async (req, res) => {
	try {
		let state = req.body.etat;
		if (state) {
			state = state.toLowerCase();
			if (state === 'en service' || state === 'hors service') {
				const response = await Vehicule.update(
					{ etat: state },
					{
						returning: true,
						where: {
							numChassis: +req.params.numChassis,
						},
					}
				);

				const UpdatedRows = response[0];
				const UpdatedVehicule = response[1];

				if (UpdatedVehicule.length === 0) {
					// No content with that numChassis
					res.status(404).send({
						error: 'not_found',
						message: `No vehicule with such numero chassis: ${+req.params
							.numChassis}`,
						status: 404,
					});
				} else {
					res.status(200).send({ UpdatedRows, UpdatedVehicule });
				}
			} else {
				res.status(400).send({
					message:
						"Attribute 'etat' must be either 'en service' or 'hors service'",
				});
				return;
			}
		} else {
			res.status(400).send({
				message: "params 'etat' can not be empty!",
			});
			return;
		}
	} catch (err) {
		res.status(500).send({
			error:
				err.message ||
				'Some error occured while attemping to set state of vehicule id ' +
					req.params.numChassis,
		});
	}
};

/**
 * returns all 'en-service' cars of a given agent de maintenace, identified by id
 * returns 404 status with not-found error message if no id is found
 * return 200 status with all the concerned cars in form of json
 *
 * @param {*} req The client request
 * @param {*} res The server response
 */

const getVehiculesEnServiceOfAGivenAgent = async (req, res) => {
	try {
		const vehiculesEnService = await Vehicule.findAll({
			where: {
				etat: 'en service',
				idAgentMaintenance: +req.params.id,
			},
		});
		if (vehiculesEnService.length === 0) {
			// No content
			res.status(404).send({
				error: 'not_found',
				message: `No vehicules are 'en service'`,
				status: 404,
			});
		} else {
			res.status(200).send(vehiculesEnService);
		}
	} catch (err) {
		res.status(500).send({
			error:
				err.message ||
				"Some error occured while retreiving vehicules 'en service'",
		});
	}
};

/**
 * This function returns all 'hors-service' cars of a given aget de maintenace, identified by it's id
 * returns 404 status with not-found error message if no such id exist
 * returns 200 status with all the concerned cars in form of json
 *
 * @param {*} req The client request
 * @param {*} res The server response
 */

const getVehiculesHorsServiceOfAGivenAgent = async (req, res) => {
	try {
		const vehiculesHorsService = await Vehicule.findAll({
			where: {
				etat: 'hors service',
				idAgentMaintenance: +req.params.id,
			},
		});
		if (vehiculesHorsService.length === 0) {
			// No content
			res.status(404).send({
				error: 'not_found',
				message: `No vehicules are 'hors service'`,
				status: 404,
			});
		} else {
			res.status(200).send(vehiculesHorsService);
		}
	} catch (err) {
		res.status(500).send({
			error:
				err.message ||
				"Some error occured while retreiving vehicules 'hors service'",
		});
	}
};

// Count vehicles (en-service) and count vehicles (hors-service)
const countVehicles = async (req,res) =>{
	try {
		const countAll = await Vehicule.findAll({
			attributes: [
				[sequelize.fn('COUNT', sequelize.col('numChassis')), 'countAll'],
			],
		})
		const countHorsService = await Vehicule.findAll({
			attributes: [
				[sequelize.fn('COUNT', sequelize.col('numChassis')), 'countHorsService'],
			],
			where: {etat:'hors service'}
		})
		const result = {}
		if (countAll.length != 0) {
			res.send([countAll[0],countHorsService[0]]);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			});
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while counting vehicules'
		});
	}
	
}

export default {
	setEtatVehicule,
	getVehiculeDetails,
	selectVehicuesOfAGivenAgent,
	getVehiculesEnServiceOfAGivenAgent,
	getVehiculesHorsServiceOfAGivenAgent,

	createVehicule,
	deleteVehicule,
	updateVehicule,
	getAllVehicule,
	getVehiculeReservations,
	countVehicles
};
