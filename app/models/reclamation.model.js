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
        idLocataire: {
            type: Sequelize.STRING(50),
            allowNull:false
        },
        type: {
            type: Sequelize.ENUM,
            values: ['bug', 'service', 'autre'],
            allowNull: false,
        },
        date : {
            type: Sequelize.DATE,
            allowNull:false,
            defaultValue: Sequelize.NOW
        }, 
    }, {
        freezeTableName: true,
        tableName: 'reclamation',
        createdAt: false,
        updatedAt: false
    });


    return Reclamation;
};