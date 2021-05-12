module.exports = function(sequelize, Sequelize) {
    const Identite = sequelize.define("identite", {
        numeroPermis: {
            type: Sequelize.DOUBLE,
            primaryKey: true,
        },
        photo: {
            type: Sequelize.STRING(255)
        },
        idLocataire: {
            type: Sequelize.INTEGER,

        },
        idOperateur: {
            type: Sequelize.INTEGER,
        }
    }, {
        freezeTableName: true,
        tableName: 'identite',
        createdAt: false,
        updatedAt: false
    });

    return Identite;
};