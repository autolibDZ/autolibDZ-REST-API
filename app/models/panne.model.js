module.exports = function (sequelize, Sequelize) {

    const Panne = sequelize.define("panne", {
        idPanne: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: Sequelize.STRING(255)
        },
        latitude: {
            type: Sequelize.FLOAT
        },
        longitude: {
            type: Sequelize.FLOAT
        },
        idVehicule: {
            type: Sequelize.INTEGER
        },
        etat: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        idAgentMaintenance: {
            type: Sequelize.INTEGER

        }

    }, {
        freezeTableName: true,
        tableName: 'panne',
        createdAt: false,
        updatedAt: false
    });
    return Panne
};