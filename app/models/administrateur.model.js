var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

module.exports = function(sequelize, Sequelize) {
    const Administrateur = sequelize.define("administrateur", {
        idAdministrateur: {
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
        },
        /*idCloudinary:{
            type: Sequelize.STRING(128),
        } , 
        secureUrl: {
            type: Sequelize.STRING(128),
        }*/
    },
    {
        freezeTableName: true,
        tableName: 'administrateur',
        createdAt: false,
        updatedAt: false
    });
    return Administrateur;
}