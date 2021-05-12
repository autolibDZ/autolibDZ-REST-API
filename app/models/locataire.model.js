module.exports = function(sequelize, Sequelize) {
    const Locataire = sequelize.define("locataire", {
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
            type: Sequelize.STRING(50)
        }
    }, {
        freezeTableName: true,
        tableName: 'locataire',
        createdAt: false,
        updatedAt: false
    });

    return Locataire;
};