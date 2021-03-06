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
        modePaiement: {
            type: Sequelize.DataTypes.ENUM({
                values: ['Stripe', 'Paiement Carte d\'abonnement', 'Rechargement']
            })
        },
        idLocataire: { //not sure if we need it
            type: Sequelize.INTEGER
        },
        idReservation: {
            type: Sequelize.INTEGER,
            unique: true
        },
    }, {
        freezeTableName: true,
        tableName: 'transaction',
        createdAt: false,
        updatedAt: false
    });

    return Transaction;
};