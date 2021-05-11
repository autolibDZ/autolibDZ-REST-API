module.exports = function(sequelize, Sequelize) {
    const Abonnement = sequelize.define("abonnement", {
      balance: {
        type: Sequelize.DOUBLE
      },
      dateRecharge: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      idLocataire: {
        type: Sequelize.INTEGER
      }
    },{
      freezeTableName: true,
      tableName: 'abonnement',
      createdAt: false,
      updatedAt: false
    });
  
    return Abonnement;
  };