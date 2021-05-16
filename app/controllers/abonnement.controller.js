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
			res.send(balance[0]);
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


const doPayment = async (req, res) => {
	// Validate request
	if (!req.params.id) {
		res.status(400).send({
			message: "params 'id' can not be empty!",
		});
		return;
	}

	if (!req.body.prix) {
		res.status(400).send({
			message: "body 'prix' element can not be empty!",
		});
		return;
	}

	// update the balance from DB
	try {
		const id = req.params.id;
		const userAbonnement = await Abonnement.findOne({
			where: {
				idLocataire: id,
			},
			
		});
		console.log(userAbonnement);

		if(userAbonnement){
			const newBalance = userAbonnement.balance - req.body.prix
			userAbonnement.update({
				balance : newBalance
			}).then(()=>{
				console.log("balance updated")
				
				res.send({
					"message" : "payment done"
				});
			})
		}else{

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
	doPayment
};
