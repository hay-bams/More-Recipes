'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId'
    });

    User.hasMany(models.Review, {
      foreignKey: 'userId'
    });

    User.hasMany(models.Upvote, {
      foreignKey: 'userId'
    });

    User.hasMany(models.Downvote, {
      foreignKey: 'userId'
    });
  };
  return User;
};