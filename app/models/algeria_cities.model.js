module.exports = function (sequelize, Sequelize) {
    const Algeria_cities = sequelize.define("algeria_cities", {
  
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
           
      },
      
      commune_name: {
        type: Sequelize.STRING,
        allowNull: false
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
  
  
    return Algeria_cities;
  }
  