module.exports = function(sequelize, Sequelize) {
    const Identite = sequelize.define("identite", {
        numeroPermis: {
            type: Sequelize.DOUBLE,
            primaryKey: true,
        },
        /*photo: {
            type: Sequelize.STRING(255)
        },*/
        idLocataire: {
            type: Sequelize.INTEGER,

        },
        idOperateur: {
            type: Sequelize.INTEGER,
        },
        valide: {
            type : Sequelize.INTEGER
        },
        idCloudinary:{
            type: Sequelize.STRING(128),
        } , 
        secureUrl: {
            type: Sequelize.STRING(128),
        },
        idCloudinaryPhotoSelfie: {
            type: Sequelize.STRING(128),
        },
        secureUrlPhotoSelfie: {
            type: Sequelize.STRING(128),
        }
    }, {
        freezeTableName: true,
        tableName: 'identite',
        createdAt: false,
        updatedAt: false
    });

    // Déclaration des clès étrangères
    Identite.associate = (models) => {
        Identite.belongsTo(models.Operateur, {
       foreignKey: 'idOperateur',
        });
   Identite.belongsTo(models.Locataire, {
          foreignKey: 'idLocataire',
        });
   }
    return Identite;
};