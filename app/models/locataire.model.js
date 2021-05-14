var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");


module.exports = function(sequelize, Sequelize) {
    const Locataire = sequelize.define("locataire", {
        idLocataire: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true,
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
    },
    {   
        hooks:{
            beforeCreate: async function(locataire, next){
                const salt = await bcrypt.genSalt(10);
                locataire.motDePasse = await bcrypt.hash(locataire.motDePasse,salt);  
        }},
        instanceMethods: {
            getSignedJwtToken : function () {
                return jwt.sign({ id: this.idLocataire, role: "locataire"},process.env.JWT_SECRET) ;
            }
            }
        }
     ,
    
    {
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