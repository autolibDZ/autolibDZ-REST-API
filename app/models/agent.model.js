module.exports = function(sequelize, Sequelize) {
    const Agent = sequelize.define("agent_maintenance", {
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
        tableName: 'agent_maintenance',
        createdAt: false,
        updatedAt: false
      });
    return Agent;
};