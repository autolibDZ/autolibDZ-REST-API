module.exports = function(sequelize, Sequelize) {
    const Trajet = sequelize.define("trajet", {
        idTrajet: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        dateDebut: {
            type: Sequelize.DATE,
        },
        dateFin: {
            type: Sequelize.DATE,
        },
        tempsEstime: {
            type: Sequelize.INTEGER,

        },
        kmParcourue: {
            type: Sequelize.FLOAT,
        },
        prixAPayer: {
            type: Sequelize.FLOAT,
        },
        idReservation: {
            type: Sequelize.INTEGER,
        }
    }, {
        freezeTableName: true,
        tableName: 'trajet',
        createdAt: false,
        updatedAt: false
    });



    return Trajet;
};