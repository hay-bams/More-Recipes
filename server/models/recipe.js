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
    },
    upvote: {
      type: DataTypes.STRING,
      defaultValue: 0,
      allowNull: false
    },
    downvote: {
      type: DataTypes.STRING,
      defaultValue: 0,
      allowNull: false
    }
  });
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Recipe.hasMany(models.Vote, {
      foreignKey: 'recipeId'
    });

    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId'
    });
  };
  return Recipe;
};
