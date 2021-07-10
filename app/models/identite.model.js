module.exports = function(sequelize, Sequelize) {
    const Identite = sequelize.define("identite", {
        idLocataire: {
            type: Sequelize.INTEGER
        },
        valide: {
            type: Sequelize.INTEGER,
            defaultValue: 2
        },
        idCloudinary: {
            type: Sequelize.STRING(128)
        },
        secureUrl: {
            type: Sequelize.STRING(128)
        },
        idCloudinaryPhotoSelfie: {
            type: Sequelize.STRING(128)
        },
        secureUrlPhotoSelfie: {
            type: Sequelize.STRING(128)
        }
    }, {
        freezeTableName: true,
        tableName: 'identite',
        createdAt: false,
        updatedAt: false
    });

    // Déclaration des clès étrangères
    Identite.associate = (models) => {
        /* Identite.belongsTo(models.Operateur, {
        foreignKey: 'idOperateur',
         });*/

        Identite.belongsTo(models.Locataire, {
            foreignKey: 'idLocataire',
        });
    }
    return Identite;
};