module.exports = function(sequelize, Sequelize) {
    const PlanMaintenance = sequelize.define("planMaintenance", {
        idPlan: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        description: {
            type: Sequelize.TEXT
        }
    }, {
        freezeTableName: true,
        tableName: 'planMaintenace',
        createdAt: false,
        updatedAt: false
    });
    return PlanMaintenance;
};