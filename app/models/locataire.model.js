module.exports = function (sequelize, Sequelize) {
    const Locataire = sequelize.define("locataire", {
        idLocataire: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: Sequelize.STRING(50)
        },
        prenom: {
            type: Sequelize.STRING(50)
        },
        email: {
            type: Sequelize.STRING(50)
        },
        motDePasse: {
            type: Sequelize.STRING(255)
        },
        Active: {
            type: Sequelize.BOOLEAN
        },
    }, {
        freezeTableName: true,
        tableName: 'locataire',
        createdAt: false,
        updatedAt: false
    });

    Locataire.associate = (models) => {
        Locataire.hasMany(models.Abonnement, {
            foreignKey: 'idLocataire'
        });
    };
    return Locataire;
};