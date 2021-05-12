module.exports = function(sequelize, Sequelize) {
    const Identite = sequelize.define("identite", {
        nom: {
            type: Sequelize.STRING(50)
        },
        prenom: {
            type: Sequelize.STRING(50)
        },
        email: {
            type: Sequelize.STRING(50)
        },
        motdepasse: {
            type: Sequelize.STRING(255)
        }
    }, {
        freezeTableName: true,
        tableName: 'operateur',
        createdAt: false,
        updatedAt: false
    });

    return Locataire;
};