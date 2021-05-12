module.exports = function(sequelize, Sequelize) {
    const Abonnement = sequelize.define("transaction", {
        idTransaction: {
            type: Sequelize.INTEGER,
            //autoIncrement: true,
            primaryKey: true
        },
        dateTransaction: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        montant: {
            type: Sequelize.FLOAT(5, 4)
        },
        moyenPayement: {
            type: Sequelize.DataTypes.ENUM({
                values: ['Paypal', 'Carte d\'abonnement']
            })
        },
        idLocataire: { //not sure if we need it
            type: Sequelize.INTEGER
        },
        idReservation: {
            type: Sequelize.INTEGER,
        },
    }, {
        freezeTableName: true,
        tableName: 'transaction',
        createdAt: false,
        updatedAt: false
    });

    return Borne;
};