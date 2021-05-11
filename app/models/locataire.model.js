module.exports = (sequelize, Sequelize) => {
    const Locataire = sequelize.define('locataire', {
            IdUtilisateur: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            Nom: {
                type: Sequelize.STRING(50)
            },
            Prenom: {
                type: Sequelize.STRING(50)
            },
            Email: {
                type: Sequelize.STRING(50)
            },
            MotDePasse: {
                type: Sequelize.STRING(50)
            },
            Active: {
                type: Sequelize.BOOLEAN
            }
        }
    );
    return Locataire;
};