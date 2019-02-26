'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idUser: {
        type: Sequelize.STRING,
      },
      fio: {
        type: Sequelize.STRING,
      },
      basicData: {
        type: Sequelize.TEXT,
      },
      audioRecordings: {
        type: Sequelize.STRING,
      },
      interestingPages: {
        type: Sequelize.STRING,
      },
      friendsList: {
        type: Sequelize.STRING,
      },
      recordHeaders: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  },
};
