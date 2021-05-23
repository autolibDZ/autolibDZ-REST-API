	const db = require('../models');
	var sequelize = require("sequelize");
	const Abonnement = db.abonnement;

	// get the balance
	const getUserBalance = async(req, res) => {
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

		if(userAbonnement){
			const newBalance = userAbonnement.balance - req.body.prix

			if(newBalance > 0){

				userAbonnement.update({
					balance : newBalance
				}).then(()=>{
					console.log("balance updated")
					
					res.send({
						"message" : "payment done"
					});
				})

			}else{

				res.status(500).send({
					error: 'user does not have enough funds to pay',
				});
			}
			


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
		let year=req.params.year;
		const trajets_par_mois = await Abonnement.findAll({
			attributes: [
				[sequelize.fn('date_part','month',sequelize.col('createdAt')),'month'],
				[sequelize.fn('COUNT',sequelize.col('idAbonnement')),'countAbonnements'],
			],
			where: sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('createdAt')),year),
			group: [sequelize.fn('date_part','month',sequelize.col('createdAt'))],
			order: [sequelize.fn('date_part','month',sequelize.col('createdAt'))],
        });
		if (trajets_par_mois.length != 0) {
			res.send(trajets_par_mois );	
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
				[sequelize.fn('date_part','year',sequelize.col('createdAt')),'year'],
			],
			group: [sequelize.fn('date_part','year',sequelize.col('createdAt'))],
			order: [sequelize.fn('date_part','year',sequelize.col('createdAt'))],
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
		countAbonnementsByMonth,
		getYears,
	};