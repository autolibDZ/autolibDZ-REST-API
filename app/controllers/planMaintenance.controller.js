const db = require('../models');
const PlanMaintenance = db.planMaintenance;
/**
 * This function is fired on a POST request to /api/plan-maintenance endopoint
 * It allows to insert a plan for a particular car
 * Each plan has two required attributes (date & action)
 *
 * @param {*} req The client request
 * @param {*} res The server response
 * @param {*} next Is used to move on to the next middleware if necessary
 * @returns
 */
const addPlanMaintenance = async (req, res, next) => {
	try {
		let addedRows = 0;
		const plans = [];
		if (req.body.length != 0) {
			for (const plan of req.body) {
				let date = new Date(plan.date);
				let action = plan.action;

				// Create object of plan maintenance
				const planMaintenance = {
					date,
					action,
				};
				await PlanMaintenance.create(planMaintenance);
				addedRows++;
				plans.push(plan);
			}
			res.status(200).send({ addedRows, plans });
		} else {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
			return;
		}
	} catch (err) {
		res.status(500).send({
			error:
				err.message ||
				"Attributes 'date' and 'action' must be communicated in the request query" +
					err,
		});
	}
};

module.exports = {
	addPlanMaintenance,
};
