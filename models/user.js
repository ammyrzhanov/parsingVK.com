const Sequelize = require('sequelize');

const sequelize = require('../utill/database');

const User = sequelize.define('user', {
  idUser: {
    type: Sequelize.STRING,
  },
  fio: Sequelize.STRING,
  basicData: Sequelize.TEXT,
  audioRecordings: Sequelize.STRING,
  interestingPages: Sequelize.STRING,
  friendsList: Sequelize.STRING,
  recordHeaders: Sequelize.STRING,
});

module.exports = User;
