module.exports = function(sequelize, Sequelize) {
    const Dirigeant = sequelize.define("dirigeant", {
        nom:{
            type:Sequelize.STRING
        },
        prenom:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING
        },
        mdp:{
            type:Sequelize.STRING
        },
        salaire:{
            type:Sequelize.DOUBLE
        }
    },{
        freezeTableName: true,
        tableName: 'dirigeant',
        createdAt: false,
        updatedAt: false
      });
    return Dirigeant;
};