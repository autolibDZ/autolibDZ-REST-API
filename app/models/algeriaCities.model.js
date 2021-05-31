module.exports = function (sequelize, Sequelize) {
    const AlgeriaCities = sequelize.define("algeria_cities", {
  
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
           
      },
      
      commune_name: {
        type: Sequelize.STRING
      },
  
      commune_name_ascii: {
        type: Sequelize.STRING,
        allowNull: false
      },
  
      daira_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
  
      daira_name_ascii: {
        type: Sequelize.STRING,
        allowNull: false
      },
  
      wilaya_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
  
      wilaya_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
  
      wilaya_name_ascii: {
        type: Sequelize.STRING,
        allowNull: false
      }
     
    },
    {
  
      freezeTableName: true,
      tableName: 'algeria_cities',
      createdAt: false,
      updatedAt: false,
    
      
    }
    );
  
  
    return AlgeriaCities;
  }
  