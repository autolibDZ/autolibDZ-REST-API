module.exports = function (sequelize, Sequelize) {
	const Abonnement = sequelize.define(
		'abonnement',
		{
			//added this
			idAbonnement: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
			balance: {
				type: Sequelize.DOUBLE,
			},
			idLocataire: {
				type: Sequelize.INTEGER,
				allowNull: false,
    			unique: true
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
