module.exports = function(sequelize, Sequelize) {
    const Concerner = sequelize.define("concerner", {
        idTrajet: {
            type: Sequelize.INTEGER,
          primaryKey: true,
        },
        idReservation: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        idBourne: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        idBourne: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        }
    }, {
        freezeTableName: true,
        tableName: 'concerner',
        createdAt: false,
        updatedAt: false
    });

    return Concerner;
};