module.exports = function(sequelize, Sequelize) {
    const Reclamation = sequelize.define("reclamation", {
        idReclamation: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        emailLocataire: {
            type: Sequelize.STRING(50),
            allowNull:false
        }
    }, {
        freezeTableName: true,
        tableName: 'reclamation',
        createdAt: false,
        updatedAt: false
    });


    return Reclamation;
};