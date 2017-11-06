module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
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
    }
  });
  Recipe.associate = (models) => {
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
