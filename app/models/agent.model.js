var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

module.exports = function(sequelize, Sequelize) {
    const AgentMaintenance = sequelize.define("agentMaintenance", {
        idAgentMaintenance: {
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
        motDePasse: {
            type: Sequelize.STRING
        },
        salaire: {
            type: Sequelize.DOUBLE
        }
    },
    {   
        hooks:{
            beforeCreate: async function(agent, next){
                const salt = await bcrypt.genSalt(10);
                agent.motDePasse = await bcrypt.hash(agent.motDePasse,salt);  
        }},
        instanceMethods: {
            getSignedJwtToken : function () {
                return jwt.sign({ id: this.idAgentMaintenance, role: "AgentMaintenance"},process.env.JWT_SECRET) ;
            }
            }
        }
     , {
        freezeTableName: true,
        tableName: 'agent_maintenance',
        createdAt: false,
        updatedAt: false
    });
    return AgentMaintenance;
};