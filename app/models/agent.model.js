module.exports = function (sequelize, Sequelize) {
	const AgentMaintenance = sequelize.define(
		'AgentMaintenance',
		{
			idAgentMaintenance: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			nom: {
				type: Sequelize.STRING,
			},
			prenom: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
			},
			motDePasse: {
				type: Sequelize.STRING(255),
			},
			salaire: {
				type: Sequelize.DOUBLE,
			},
		},
		{
			freezeTableName: true,
			tableName: 'agent_maintenance',
			createdAt: false,
			updatedAt: false,
		}
	);

	return AgentMaintenance;
};
