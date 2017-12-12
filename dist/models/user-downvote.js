'use strict';

module.exports = function (sequelize, DataTypes) {
  var Downvote = sequelize.define('Downvote', {});
  Downvote.associate = function (models) {
    Downvote.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Downvote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Downvote;
};