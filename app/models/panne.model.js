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
        longtitude: {
            type: Sequelize.FLOAT
        },
        idVehicule: {
            type: Sequelize.INTEGER
        },
        etat: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    }, {
        freezeTableName: true,
        tableName: 'panne',
        createdAt: false,
        updatedAt: false
    });
    return Panne
};