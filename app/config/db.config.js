module.exports = {
    HOST: "localhost",
    USER: "sil1",
    PASSWORD: "sil1",
    DB: "AutoLibDZ",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };