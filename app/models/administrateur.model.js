var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

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
        hooks:{
            beforeCreate: async function(administrateur, next){
             const salt = await bcrypt.genSalt(10);
             administrateur.mdp = await bcrypt.hash(administrateur.mdp,salt);  
        }},
        instanceMethods: {
            getSignedJwtToken : function () {
                return jwt.sign({ id: this.idAdministrateur, role: "administrateur"},process.env.JWT_SECRET) ;
            }
            }
        }
     ,{
        freezeTableName: true,
        tableName: 'administrateur',
        createdAt: false,
        updatedAt: false
    });
    return Administrateur;
}