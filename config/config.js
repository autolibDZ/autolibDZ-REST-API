const dotenv = require('dotenv');

dotenv.config();

const environment = process.env.NODE_ENV;
console.log(process.env.NODE_ENV);
var toExport;
console.log("---------_>"+environment)
//if(environment == "development")
if(environment !="test"){
  console.log("***** DEV Environment *****")
  toExport = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: process.env.DB_NAME,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
}else {
console.log("***** TEST Environment *****")
  toExport = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "testdb",
    dialect: "sqlite",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

}

module.exports = toExport