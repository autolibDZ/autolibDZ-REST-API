const db = require('../models');
const Vehicule = db.vehicules;

// Select all cars
const selectVehicues = async (req, res) => {
	try {
		const vehicules = await Vehicule.findAll();
		if (vehicules.length === 0) {
			// Nothing to display
			res.status(404).send({
				error: 'not_found',
				message: 'Nothing to display',
				status: 404,
			});
		} else {
			res.status(200).send(vehicules);
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while retreiving vehicules',
		});
	}
};

const getVehiculeDetails = async (req, res) => {
	try {
		const vehicule = await Vehicule.findAll({
			where: {
				numChassis: +req.params.numChassis,
			},
		});
		if (vehicule.length === 0) {
			// No content with that numChassis
			res.status(404).send({
				error: 'not_found',
				message: `No vehicule with such numero chassis: ${+req.params
					.numChassis}`,
				status: 404,
			});
		} else {
			res.status(200).send(vehicule[0]);
		}
	} catch (err) {
		res.status(500).send({
			error:
				err.message ||
				'Some error occured while retreiving vehicules agent id: ' +
					req.params.id,
		});
	}
};

const selectVehicuesOfAGivenAgent = async (req, res) => {
	try {
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
	} catch (err) {
		res.status(500).send({
			error:
				err.message ||
				'Some error occured while retreiving vehicules agent id: ' +
					req.params.id,
		});
	}
};

export default {
	selectVehicues,
	getVehiculeDetails,
	selectVehicuesOfAGivenAgent,
};
