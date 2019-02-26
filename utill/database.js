const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'postgres', '1399', {
  dialect: 'postgres',
  host: 'localhost'
});

module.exports = sequelize;