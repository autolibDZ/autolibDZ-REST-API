module.exports = function(sequelize, Sequelize) {
    const Operateur = sequelize.define("operateur", {
        nom: {
            type: Sequelize.STRING
        },
        prenom: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        mdp: {
            type: Sequelize.STRING
        },
        salaire: {
            type: Sequelize.DOUBLE
        }
    }, {
        freezeTableName: true,
        tableName: 'operateur',
        createdAt: false,
        updatedAt: false
    });
    return Operateur;
};