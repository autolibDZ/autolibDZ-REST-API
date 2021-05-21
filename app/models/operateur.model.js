module.exports = function(sequelize, Sequelize) {
    const Operateur = sequelize.define("operateur", {
        idOperateur: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        motDePasse: {
            type: Sequelize.STRING(255)
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