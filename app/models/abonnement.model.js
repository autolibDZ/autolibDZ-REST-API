module.exports = function(sequelize, Sequelize) {
    const Abonnement = sequelize.define("abonnement", {
      balance: {
        type: Sequelize.DOUBLE
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