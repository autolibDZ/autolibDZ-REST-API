const db = require('../app/models');
const Vehicule = db.vehicules;

const testSelectVehicules = async (numChassis) => {
	const vehicule = await Vehicule.findAll({
		where: {
			numChassis: numChassis,
		},
	})[0];

	return vehicule;
};

module.exports = {
	testSelectVehicules,
};
