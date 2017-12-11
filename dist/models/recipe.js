'use strict';

module.exports = function (sequelize, DataTypes) {
  var Recipe = sequelize.define('Recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  Recipe.associate = function (models) {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Recipe.hasMany(models.Upvote, {
      foreignKey: 'recipeId'
    });

    Recipe.hasMany(models.Downvote, {
      foreignKey: 'recipeId'
    });

    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId'
    });
  };
  return Recipe;
};