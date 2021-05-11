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

export default {
	selectVehicues,
};
