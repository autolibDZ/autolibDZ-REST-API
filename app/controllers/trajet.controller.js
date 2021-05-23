const db = require('../models');
const Trajet = db.trajet;

var sequelize = require("sequelize");

// For a specific year, return how much reservations there were for each month
const countTrajetsByMonth = async (req, res) => {
	// Validate request
	if (!req.params.year) {
		res.status(400).send({
			message: "params 'year' can not be empty!",
		});
		return;
	}

	try {
		let year=req.params.year;
		const trajets_par_mois = await Trajet.findAll({
			attributes: [
				[sequelize.fn('date_part', 'month', sequelize.col('dateDebut')),'month'],
				[sequelize.fn('COUNT',sequelize.col('idTrajet')),'countTrajets'],
			],
			where: sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('dateDebut')),year),
			group: [sequelize.fn('date_part', 'month', sequelize.col('dateDebut'))],
			order: [sequelize.fn('date_part', 'month', sequelize.col('dateDebut'))],
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
			error: err.message || 'Some error occured while counting trajets'
		});
	}
};

const getYears = async (req, res) => {
	//const maxYearsToGet=5

	try {
		const years = await Trajet.findAll({
			attributes: [
				[sequelize.fn('date_part', 'year', sequelize.col('dateDebut')),'year'],
			],
            //order: [[sequelize.literal('"dateDebut"'), 'DESC']],
			group: [sequelize.fn('date_part', 'year', sequelize.col('dateDebut'))],
			order: [sequelize.fn('date_part', 'year', sequelize.col('dateDebut'))],
			//limit :maxYearsToGet
        });
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
    countTrajetsByMonth,
	getYears,
}