const db = require('../models');
var sequelize = require("sequelize");
const Abonnement = db.abonnement;
var jwt = require("jsonwebtoken");

// get the balance
const getUserBalance = async (req, res) => {

	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]


	if (token == null) {

		res.status(403).send({
			message: "Access Forbidden,invalid token",
		});
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		if (user != undefined) {

			const role = user.role

			if (role == "agent") { //only locataire and admin can check out the balance
				res.status(403).send({
					message: "Access Forbidden,you can't do this operation",
				});
				return;

			} else {



			}

		}

	} catch (err) {
		res.status(403).send({
			message: "Access Forbidden,invalid token",
		});
		return;
	}

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
		//console.log(balance);

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

	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) {

		res.status(403).send({
			message: "Access Forbidden,invalid token",
		});
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		if (user != undefined) {

			const role = user.role

			if (role != "locataire") { //only locataire can do this operation
				res.status(403).send({
					message: "Access Forbidden,you can't do this operation",
				});
				return;

			} else {



			}

		}

	} catch (err) {
		res.status(403).send({
			message: "Access Forbidden,invalid token",
		});
		return;
	}

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

	if (isNaN(req.body.prix)) {
		res.status(400).send({
			message: "body 'prix' element must be a number",
		});
		return;
	}

	if (req.body.prix < 0) {
		res.status(400).send({
			message: "body 'prix' element must be a positive number",
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

		if (userAbonnement) {
			const newBalance = userAbonnement.balance - req.body.prix

			if (newBalance > 0) {

				userAbonnement.update({
					balance: newBalance
				}).then(() => {
					console.log("balance updated")

					res.send({
						"message": "payment done"
					});
				})

			} else {

				res.status(500).send({
					error: 'user does not have enough funds to pay',
				});
			}



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

const rechargezCarteAbonnement = async (req, res) => {

	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) {

		res.status(403).send({
			message: "Access Forbidden,invalid token",
		});
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		if (user != undefined) {

			const role = user.role

			if (role != "administrateur") { //only administrateur can do this operation
				res.status(403).send({
					message: "Access Forbidden,you can't do this operation",
				});
				return;

			} else {



			}

		}

	} catch (err) {
		console.log("---->"+err)
		res.status(403).send({
			message: "Access Forbidden,invalid token",
		});
		return;
	}

	// Validate request

	if (!req.params.id) {
		res.status(400).send({
			message: "params 'id' can not be empty!",
		});
		return;
	}

	if (!req.body.value) {
		res.status(400).send({
			message: "body 'value' element can not be empty!",
		});
		return;
	}

	if (isNaN(req.body.value)) {
		res.status(400).send({
			message: "body 'value' element must be a number",
		});
		return;
	}

	if (req.body.value < 0) {
		res.status(400).send({
			message: "body 'value' element must be a positive number",
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

		if (userAbonnement) {
			const newBalance = userAbonnement.balance + req.body.value

			userAbonnement.update({
				balance: newBalance
			}).then(() => {
				console.log("balance updated")

				res.send({
					"message": "top up has been done Successfully"
				});
			})


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

const createAbonnement = async (req, res) => {

	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) {

		res.status(403).send({
			message: "Access Forbidden,invalid token",
		});
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		if (user != undefined) {

			const role = user.role

			if (role != "administrateur") { //only administrateur can do this operation
				res.status(403).send({
					message: "Access Forbidden,you can't do this operation",
				});
				return;

			} else {
			}

		}

	} catch (err) {
		console.log("---->"+err)
		res.status(403).send({
			message: "Access Forbidden,invalid token",
		});
		return;
	}

	// Validate request

	if (!req.params.id) {
		res.status(400).send({
			message: "params 'id' can not be empty!",
		});
		return;
	}

	if (!req.body.balance) {
		res.status(400).send({
			message: "body 'balance' element can not be empty!",
		});
		return;
	}

	if (isNaN(req.body.balance)) {
		res.status(400).send({
			message: "body 'balance' element must be a number",
		});
		return;
	}

	if (req.body.balance < 0) {
		res.status(400).send({
			message: "body 'balance' element must be a positive number",
		});
		return;
	}

	// update the balance from DB
	try {
		const id = req.params.id;
		const balance = req.body.balance
		const abonnement = {
			balance : balance,
			idLocataire : id,
		}

		let data = await Abonnement.create(abonnement)
		res.send({
			"message" : "Abonnement has been created Successfully !"
		})

	} catch (err) {
		res.status(500).send({
			error: err || 'Some error occurred !',
		});
	}
};

// For a specific year, return how much Abonnements there were for each month
const countAbonnementsByMonth = async (req, res) => {
	// Validate request
	if (!req.params.year) {
		res.status(400).send({
			message: "params 'year' can not be empty!",
		});
		return;
	}

	try {
		let year = req.params.year;
		const trajets_par_mois = await Abonnement.findAll({
			attributes: [
				[sequelize.fn('date_part', 'month', sequelize.col('createdAt')), 'month'],
				[sequelize.fn('COUNT', sequelize.col('idAbonnement')), 'countAbonnements'],
			],
			where: sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('createdAt')), year),
			group: [sequelize.fn('date_part', 'month', sequelize.col('createdAt'))],
			order: [sequelize.fn('date_part', 'month', sequelize.col('createdAt'))],
		});
		if (trajets_par_mois.length != 0) {
			res.send(trajets_par_mois);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			});
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while counting abonnements'
		});
	}
};

const getYears = async (req, res) => {


	try {
		const years = await Abonnement.findAll({
			attributes: [
				[sequelize.fn('date_part', 'year', sequelize.col('createdAt')), 'year'],
			],
			group: [sequelize.fn('date_part', 'year', sequelize.col('createdAt'))],
			order: [sequelize.fn('date_part', 'year', sequelize.col('createdAt'))],
		})
		if (years.length != 0) {
			res.send(years);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			});
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while getting years'
		});
	}
};

export default {
	getUserBalance,
	doPayment,
	rechargezCarteAbonnement,
	createAbonnement,
	countAbonnementsByMonth,
	getYears,
};