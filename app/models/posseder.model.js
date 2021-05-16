module.exports = function(sequelize, Sequelize) {
    const Posseder = sequelize.define("posseder", {
        idLocataire: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        NumeroCarte: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {
        freezeTableName: true,
        tableName: 'posseder',
        createdAt: false,
        updatedAt: false
    });

    return Posseder;
};