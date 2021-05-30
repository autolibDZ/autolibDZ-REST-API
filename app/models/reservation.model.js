module.exports = function(sequelize, Sequelize) {
    const Reservation = sequelize.define(
        'reservation', {
            idReservation: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
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
            },
            codePin: {
                type: Sequelize.STRING(255)
            },
            tempsEstime: {
                type: Sequelize.INTEGER,

            },
            distanceEstime: {
                type: Sequelize.FLOAT,

            },
            prixEstime: {
                type: Sequelize.FLOAT,

            },

        }, {
            freezeTableName: true,
            tableName: 'reservation',
            timestamps: true,
            createdAt: false,
            updatedAt: false,

        }
    );
    Reservation.associate = function(models) {
        Reservation.belongsTo(models.locataire, {
            foreignKey: 'idLocataire',

        });
    };

    return Reservation;
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


};