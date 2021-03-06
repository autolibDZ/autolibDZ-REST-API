module.exports = function (sequelize, Sequelize) {
	const Abonnement = sequelize.define(
		'abonnement',
		{
			//added this
			idAbonnement: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			balance: {
				type: Sequelize.DOUBLE,
			},
			idLocataire: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		},
		{
			freezeTableName: true,
			tableName: 'abonnement',
			createdAt: true,
			updatedAt: false,
		}
	);

	Abonnement.associate = (models) => {
		Abonnement.belongsTo(models.Locataire, {
			foreignKey: 'idLocataire',
		});
	};

	return Abonnement;
};
