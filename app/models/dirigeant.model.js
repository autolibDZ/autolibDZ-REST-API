module.exports = function(sequelize, Sequelize) {
    const Dirigeant = sequelize.define("dirigeant", {
        idDirigeant: {
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
        motDePasse: {
            type: Sequelize.STRING(255)
        },
        salaire: {
            type: Sequelize.DOUBLE
        }
    }, {
        freezeTableName: true,
        tableName: 'dirigeant',
        createdAt: false,
        updatedAt: false
    });
    return Dirigeant;
};