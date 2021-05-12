const db = require('../models');
const Abonnement = db.abonnement;

// get the balance
const getUserBalance = async (req, res) => {
	// Validate request
	if (!req.params.id) {
		res.status(400).send({
			message: "params 'id' can not be empty!",
		});
		return;
	}

	// read the balance from DB
	try {
		const id = req.params.id;
		const balance = await Abonnement.findAll({
			where: {
				idLocataire: id,
			},
			attributes: ['balance'],
		});
		console.log(balance);

		if (balance.length != 0) {
			res.send(balance);
		} else {
			res.status(404).send({
				error: 'the id ' + id + ' does not exist',
			});
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occurred !',
		});
	}
};

export default {
	getUserBalance,
};
