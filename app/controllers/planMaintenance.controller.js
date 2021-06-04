const db = require('../models');
const PlanMaintenance = db.planMaintenance;
const { Op } = require('sequelize');

/**
 * This functions verifies if an action exists in plan de maintenance of a guven numVhassis car
 *
 * @param {Int} numChassis
 * @param {String} action
 * @returns
 */
const verifyIfActionExists = async (numChassis, action) => {
	let exists = false;

	const plans = await PlanMaintenance.findAll({
		where: {
			numChassis: numChassis,
		},
	});

	for (const plan of plans) {
		if (plan.action === action) {
			exists = true;
			break;
		}
	}
	if (exists) return true;
	else return false;
};

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
		const addedPlans = [];
		const existedPlans = [];

		let UtilPlans = [];
		if (!Array.isArray(req.body)) {
			UtilPlans.push(req.body);
		} else UtilPlans = req.body;

		if (UtilPlans.length != 0) {
			for (const plan of UtilPlans) {
				let date = new Date(plan.date);
				let action = plan.action;
				let numChassis = plan.numChassis;
				let idAgentMaintenance = plan.idAgentMaintenance;

				// Create object of plan maintenance
				const planMaintenance = {
					date,
					action,
					numChassis,
					idAgentMaintenance,
				};

				const exists = await verifyIfActionExists(numChassis, action);

				if (!exists) {
					await PlanMaintenance.create(planMaintenance);
					addedRows++;
					addedPlans.push(plan);
				} else existedPlans.push(plan);
			}
			res.status(200).send({ addedRows, addedPlans, existedPlans });
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

/**
 * This function is fired on a DELETE request to /api/plan-maintenance endopoint
 * It allows to delete a plan for a particular car
 * Each plan has two required attributes (date & action)
 *
 * @param {*} req The client request
 * @param {*} res The server response
 * @param {*} next Is used to move on to the next middleware if necessary
 * @returns
 */

const deletePlanMaintenance = async (req, res, next) => {
	try {
		if (parseInt(req.params.numChassis, 10)) {
			const result = await PlanMaintenance.destroy({
				where: {
					[Op.and]: [
						{ numChassis: +req.params.numChassis },
						{ action: req.body.action },
					],
				},
			});
			if (result > 0) {
				res.status(200).send({
					message: `action: ${req.body.action} was successfully deleted from car: ${req.params.numChassis}`,
				});
			} else {
				res.status(400).send({
					message:
						'No car with such numChassis: ' +
						req.params.numChassis +
						' and action: ' +
						req.body.action,
				});
			}
		} else next();
	} catch (err) {
		res.status(500).send({
			error: err.message,
		});
	}
};
/**
 * This function allows to get plan de maintenance for a given car numChassis
 *
 * @param {*} req The client request
 * @param {*} res The server response
 * @param {*} next Used if ecessary to move on into the next middleare
 */
const getPlanMaintenance = async (req, res, next) => {
	try {
		if (parseInt(req.params.numChassis, 10)) {
			const plans = await PlanMaintenance.findAll({
				where: {
					numChassis: +req.params.numChassis,
				},
			});
			if (plans.length === 0) {
				// No content with that numChassis
				res.status(404).send({
					error: 'not_found',
					message: `No plans de maintenance with such numero chassis ${+req
						.params.numChassis} found.`,
					status: 404,
				});
			} else {
				res.status(200).send(plans);
			}
		} else next();
	} catch (err) {
		res.status(500).send({
			error: err.message,
		});
	}
};

module.exports = {
	addPlanMaintenance,
	getPlanMaintenance,
	deletePlanMaintenance,
};
