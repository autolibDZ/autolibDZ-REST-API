const db = require('../models');
const PlanMaintenance = db.planMaintenance;
const { Op } = require('sequelize');


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
