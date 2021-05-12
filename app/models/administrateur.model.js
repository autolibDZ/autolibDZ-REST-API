module.exports = function(sequelize, Sequelize) {
    const Administrateur = sequelize.define("administrateur", {
        idAdministrateur: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
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
        tableName: 'administrateur',
        createdAt: false,
        updatedAt: false
    });
    return Administrateur;
}