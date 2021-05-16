import { Locataire } from './locataire.model'

module.exports = function (sequelize, Sequelize) {
    const Abonnement = sequelize.define("abonnement", {
        //added this
        idAbonnement: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        balance: {
            type: Sequelize.DOUBLE,
        },
        idLocataire: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        tableName: 'abonnement',
        createdAt: false,
        updatedAt: false
    });

    Abonnement.associate = (models) => {
        Abonnement.belongsTo(models.Locataire, {
            foreignKey: 'idLocataire'
        });
    };

    return Abonnement;
};