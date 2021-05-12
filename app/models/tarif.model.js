module.exports = function(sequelize, Sequelize) {
    const Tarif = sequelize.define("tarif", {
        idTarif: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        tarif: {
            type: Sequelize.FLOAT
        },
        description: {
            type: Sequelize.STRING(255)
        },
        idAdministrateur: {
            type: Sequelize.INTEGER
        }

    }, {
        freezeTableName: true,
        tableName: 'tarif',
        createdAt: false,
        updatedAt: false
    });

    return Tarif;
};