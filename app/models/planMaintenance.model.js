module.exports = function (sequelize, Sequelize) {
	const PlanMaintenance = sequelize.define(
		'planMaintenance',
		{
			idPlan: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
			date: {
				type: Sequelize.DATEONLY,
			},
			action: {
				type: Sequelize.TEXT,
			},
			numChassis: {
				type: Sequelize.INTEGER,
			},
			idAgentMaintenance: {
				type: Sequelize.INTEGER,
			},
		},
		{
			freezeTableName: true,
			tableName: 'planMaintenace',
			createdAt: false,
			updatedAt: false,
		}
	);
	return PlanMaintenance;
};
