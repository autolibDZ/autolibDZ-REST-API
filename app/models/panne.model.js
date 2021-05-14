module.exports = function(sequelize, Sequelize) {

    const Panne = sequelize.define("panne", {
        idPanne: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING(255)
        },
        position: {
            type: Sequelize.STRING(30)
        },

    }, {
        freezeTableName: true,
        tableName: 'panne',
        createdAt: false,
        updatedAt: false
    });
    return Panne
};