const db = require('../models');
const Vehicule = db.vehicules;

// Select all cars
const selectVehicues = async (req, res) => {
	try {
		const vehicules = await Vehicule.findAll();
		res.status(200).send(vehicules);
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
		res.status(200).send(vehicules);
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
