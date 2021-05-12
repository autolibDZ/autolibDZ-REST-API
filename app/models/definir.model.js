module.exports = function(sequelize, Sequelize) {
    const Definir = sequelize.define("definir", {
        idAgent: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        NumChassis: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        idPlan: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        }
    }, {
        freezeTableName: true,
        tableName: 'definir',
        createdAt: false,
        updatedAt: false
    });

    return Definir;
};