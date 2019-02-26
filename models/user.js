'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    idUser: DataTypes.STRING,
    fio: DataTypes.STRING,
    basicData: DataTypes.TEXT,
    audioRecordings: DataTypes.STRING,
    interestingPages: DataTypes.STRING,
    friendsList: DataTypes.STRING,
    recordHeaders: DataTypes.STRING,
  }, {});
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
