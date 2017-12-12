'use strict';

module.exports = function (sequelize, DataTypes) {
  var Upvote = sequelize.define('Upvote', {});
  Upvote.associate = function (models) {
    Upvote.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Upvote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Upvote;
};