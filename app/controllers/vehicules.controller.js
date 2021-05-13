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

const selectVehicuesOfAGivenAgent = async (req, res) => {
	try {
		const vehicules = await Vehicule.findAll({
			where: {
				id_agent_maintenance: +req.params.id,
			},
		});
		if (vehicules.length === 0) {
			// Nothing content with that id
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
	selectVehicuesOfAGivenAgent,
};
