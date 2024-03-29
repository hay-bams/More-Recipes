module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Favourite.associate = (models) => {
    Favourite.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Favourite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId'
    });
  };
  return Favourite;
};

