import { Sequelize } from 'sequelize';
import dbConfig from '../../config/config';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//To test the database connection
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}



db.abonnement = require("./abonnement.model")(sequelize, Sequelize);
db.vehicules = require('./vehicule.model')(sequelize, Sequelize);
db.locataire = require("./locataire.model")(sequelize, Sequelize);
db.administrateur = require("./administrateur.model")(sequelize, Sequelize);
db.agent = require("./agent.model")(sequelize, Sequelize);
db.borne = require('./borne.model')(sequelize, Sequelize);
db.dirigenat = require("./dirigeant.model")(sequelize, Sequelize);
db.operateur = require("./operateur.model")(sequelize, Sequelize);
db.paiement = require("./paiement.model")(sequelize, Sequelize);
db.pannne = require('./panne.model')(sequelize, Sequelize);
db.planMaintenance = require("./planMaintenance.model")(sequelize, Sequelize);
db.reclamation = require("./paiement.model")(sequelize, Sequelize);
db.tarif = require('./tarif.model')(sequelize, Sequelize);
db.trajet = require("./trajet.model")(sequelize, Sequelize);

module.exports = db;