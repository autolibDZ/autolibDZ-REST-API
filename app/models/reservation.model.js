module.exports = function(sequelize, Sequelize) {
    const Reservation = sequelize.define(
        'reservation', {
            idReservation: {
                type: Sequelize.INTEGER,
             primaryKey: true,
            },
            etat: {
                type: Sequelize.STRING,
            },
            idVehicule: {
                type: Sequelize.INTEGER,
            },
            idLocataire: {
                type: Sequelize.INTEGER,
            },
            idBorneDepart: {
                type: Sequelize.INTEGER,
            },
            idBorneDestination: {
                type: Sequelize.INTEGER,
            }

        },

        {
            freezeTableName: true,
            tableName: 'reservation',
            timestamps: true,
            createdAt: false,
            updatedAt: false,
            initialAutoIncrement: true
        }

    );
    /* Reservation.associate = function(models) {
         // associations can be defined here
         Reservation.belongsTo(models.utilisateur, {
             foreignKey: 'idUtilisateur'
         });
     };
     Reservation.associate = function(models) {
         // associations can be defined here
         Reservation.belongsTo(models.vehicules, {
             foreignKey: 'numChassis'
         });
     };*/

    return Reservation;
};

/*idVehicule
idLocataire
idBorneDepart
idBorneDestination*/