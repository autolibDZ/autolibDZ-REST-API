module.exports = function (sequelize, Sequelize) {
	const Vehicule = sequelize.define(
		'vehicules',
		{
			numChassis: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
			numImmatriculation: {
				type: Sequelize.INTEGER,
			},
			modele: {
				type: Sequelize.STRING,
			},
			marque: {
				type: Sequelize.STRING,
			},
			couleur: {
				type: Sequelize.STRING,
			},
			etat: {
				type: Sequelize.STRING,
			},
			tempsDeRefroidissement: {
				type: Sequelize.INTEGER,
			},
			pressionHuileMoteur: {
				type: Sequelize.INTEGER,
			},
			chargeBatterie: {
				type: Sequelize.INTEGER,
			},
			anomalieCircuit: {
				type: Sequelize.STRING,
			},
			pressionPneus: {
				type: Sequelize.INTEGER,
			},
			niveauMinimumHuile: {
				type: Sequelize.INTEGER,
			},
			regulateurVitesse: {
				type: Sequelize.INTEGER,
			},
			limiteurVitesse: {
				type: Sequelize.INTEGER,
			},
			id_agent_maintenance: {
				type: Sequelize.INTEGER,
			},
		},
		{
			timestamps: true,
		}
	);

	return Vehicule;
};
