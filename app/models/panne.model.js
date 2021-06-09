module.exports = function(sequelize, Sequelize) {

    const Panne = sequelize.define("panne", {
        idPanne: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING(255)
        },
        latitude: {
            type: Sequelize.DOUBLE
        },
        longtitude: {
            type: Sequelize.DOUBLE
        },
        idVehicule: {
            type: Sequelize.INTEGER
        },
        etat: {
            type: Sequelize.BOOLEAN
        }

    }, {
        freezeTableName: true,
        tableName: 'panne',
        createdAt: false,
        updatedAt: false
    });
    return Panne
};