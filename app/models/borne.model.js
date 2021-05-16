module.exports = function(sequelize, Sequelize) {
    const Borne = sequelize.define("borne", {
        idBorne: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        nomBorne: {
            type: Sequelize.STRING
        },
        wilaya: {
            type: Sequelize.STRING
        },
        commune: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.FLOAT
        },
        longitude: {
            type: Sequelize.FLOAT
        },
        nbVehicules: {
            type: Sequelize.INTEGER
        },
        nbPlaces: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        tableName: 'borne',
        createdAt: false,
        updatedAt: false
    });

    return Borne;
};