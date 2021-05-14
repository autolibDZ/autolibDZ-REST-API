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
    }, {
        freezeTableName: true,
        tableName: 'agent_maintenance',
        createdAt: false,
        updatedAt: false
    });
    return AgentMaintenance;
};