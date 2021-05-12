module.exports = function(sequelize, Sequelize) {
    const Paiement = sequelize.define("paiement", {
        numeroCarte: {
            type: Sequelize.DOUBLE,
            primaryKey: true,
        }
    }, {
        freezeTableName: true,
        tableName: 'paiement',
        createdAt: false,
        updatedAt: false
    });

    return Paiement;
};