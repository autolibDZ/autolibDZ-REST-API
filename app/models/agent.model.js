const db = require('../models');
const Vehicule = db.vehicules;

module.exports = function (sequelize, Sequelize) {
	const AgentMaintenance = sequelize.define(
		'agentMaintenance',
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

	// Declaration des clées étrangères
	// Soient A et B deux modèles, A étant la source et B étant la destination:
	// A.hasMany(B) signifie que y a une relation de type: One to Many (1..n)
	// tel que, la clé étrnagère est déclarée au niveau de la destination, içi c'est B
	AgentMaintenance.associate = function (modals) {
		AgentMaintenance.hasMany(modals.Vehicule, {
			foreignKey: 'id_agent_maintenance',
		});
	};

	return AgentMaintenance;
};
