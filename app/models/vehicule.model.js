
  module.exports= function (squelize, Sequelize){
      const Vehicule = squelize.define("vehicule", {
      numChassis: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
      },
      
      numImmatriculation: {
          type: Sequelize.INTEGER,
          allowNull: false
      }, 
      modele: {
          type: Sequelize.STRING(50),
          allowNull: false
      }, 
      marque: {
          type: Sequelize.STRING(50), 
          allowNull: false
      }, 
      couleur: {
          type: Sequelize.STRING(50), 
          allowNull: false
      }, 
      etat: {
          type: Sequelize.ENUM,
          values: ['réservé','Nonréservé','circulation','panne','maintenance'], 
          allowNull: false
      },
      tempsDeRefroidissement: {
          type: Sequelize.INTEGER, 
          allowNull: false
      }, 
      pressionHuileMoteur : {
        type: Sequelize.INTEGER, 
        allowNull: false
      }, 
      chargeBatterie: {
          type: Sequelize.INTEGER, 
          allowNull: false
      }, 
      anomalieCircuit: {
          type: Sequelize.STRING(30),
          allowNull: false
      },
      pressionPneus: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      niveauMinimumHuile: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      regulateurVitesse: {
        type: Sequelize.INTEGER,
        allowNull: false
      }, 
      limiteurVitesse: {
        type: Sequelize.INTEGER,
        allowNull: false
      }, 
      
      }); 
/*
  //  Déclaration des clès étrangères     
  vehicule.associate = function (models){
    vehciule.belongsTo(models.utilisateur, {
      foreignKey:'idAgentMaintenace',
    });

    vehciule.belongsTo(models.borne, {
      foreignKey:'idBorne',
    });
  }*/ 
      return Vehicule; 
  }



  /*
{
  "numChassis":"323456789",
  "numImmatriculation":"123",
    "modele": "Test",
    "marque": "Test",
    "couleur": "Test", 
    "etat": "Test", 
    "tempsDeRefroidissement": "20", 
    "pressionHuileMoteur": "20", 
    "chargeBatterie": "20", 
    "anomalieCircuit": "Rien", 
    "pressionPneus": "20", 
    "niveauMinimumHuile":"20", 
    "regulateurVitesse": "20", 
    "limiteurVitesse": "20"

} */ 