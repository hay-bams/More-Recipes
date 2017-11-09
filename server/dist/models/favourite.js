'use strict';

module.exports = function (sequelize, DataTypes) {
  var Favourite = sequelize.define('Favourite', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Favourite.associate = function (models) {
    Favourite.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Favourite;
};