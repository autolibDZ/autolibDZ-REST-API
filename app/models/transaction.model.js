module.exports = function (sequelize, Sequelize) {
    const Transaction = sequelize.define("transaction", {
        idTransaction: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
                values: ['Stripe', 'Carte d\'abonnement']
            })
        },
        idLocataire: { //not sure if we need it
            type: Sequelize.INTEGER
        },
        idReservation: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false
        },
    }, {
        freezeTableName: true,
        tableName: 'transaction',
        createdAt: false,
        updatedAt: false
    });

    return Transaction;
};