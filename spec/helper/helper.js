const { Sequelize, DataTypes } = require('sequelize');
const queryInterface = sequelize.getQueryInterface();

const testDb = new Sequelize('testDb', 'root', 'root', {
    dialect: 'sqlite',
    storage: '../testDb/' ,// or ':memory:'
  });



 module.exports = {
    testDb,
  }