import dotenv from 'dotenv'

dotenv.config()

// importation des informations du fichier .env
  module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
    /*
     development: {
      url: process.env.DEV_DATABASE_URL,
      dialect: 'postgres',
    },
    test: {
      url: process.env.TEST_DATABASE_URL,
      dialect: 'postgres',
    },
   */
  };