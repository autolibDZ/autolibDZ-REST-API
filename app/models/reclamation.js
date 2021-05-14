module.exports = function(sequelize, Sequelize) {
    const Reclamation = sequelize.define("reclamation", {
        idReclamation: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING(50)
        },
        idLocataire: {
            type: Sequelize.INTEGER,
        }
    }, {
        freezeTableName: true,
        tableName: 'reclamation',
        createdAt: false,
        updatedAt: false
    });


    return Reclamation;
};