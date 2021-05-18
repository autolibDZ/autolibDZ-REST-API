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
            }

        },
        {
            freezeTableName: true,
            tableName: 'reservation',
            timestamps: true,
            createdAt: false,
            updatedAt: false,

        }
    );
    return Reservation;



};
