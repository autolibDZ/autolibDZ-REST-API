module.exports = function (sequelize, Sequelize) {
	const Vehicule = sequelize.define(
		'vehicule',
		{
			numChassis: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
			numImmatriculation: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			modele: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			marque: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			couleur: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			etat: {
				type: Sequelize.ENUM,
				values: ['circulation', 'en service', 'reserve', 'hors service','supprime'],
				allowNull: false,
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
			idAgentMaintenance: {
				type: Sequelize.INTEGER,
			},
			idBorne: {
				type: Sequelize.INTEGER,
			},
			idCloudinary: {
				type: Sequelize.STRING(128),
			},
			secureUrl: {
				type: Sequelize.STRING(128),
			},
		},
		{
			freezeTableName: true,
			tableName: 'vehicule',
			createdAt: false,
			updatedAt: false,
		}
	);

	// Déclaration des clès étrangères
	Vehicule.associate = (models) => {
		Vehicule.hasOne(models.utilisateur, {
			foreignKey: 'idAgentMaintenace',
		});
		Vehicule.hasOne(models.borne, {
			foreignKey: 'idBorne',
		});
	};

	return Vehicule;
};
