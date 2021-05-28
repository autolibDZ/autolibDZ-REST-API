module.exports = function (sequelize, Sequelize) {
  const Borne = sequelize.define("borne", {

    idBorne: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
      
    },
    
    nomBorne: {
      type: Sequelize.STRING
    },

    wilaya: {
      type: Sequelize.STRING(40),
      allowNull: false
    },

    commune: {
      type: Sequelize.STRING(40),
      allowNull: false
    },

    latitude: {
      type: Sequelize.FLOAT,
      allowNull: false
    },

    longitude: {
      type: Sequelize.FLOAT,
      allowNull: false
    },

    nbVehicules: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    nbPlaces: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  },
  {

    freezeTableName: true,
    tableName: 'borne',
    createdAt: false,
    updatedAt: false,
  
    
  }
  );

  Borne.associate = function (modals) {
		Borne.hasMany(modals.Vehicule, {
			foreignKey: 'idBorne',
		});
	};

  return Borne;
}
