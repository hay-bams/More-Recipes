module.exports = (sequelize, DataTypes) => {
  const favourite = sequelize.define('Favourite', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  favourite.associate = (models) => {
    favourite.belongsToMany(models.User, {
      foreignKey: 'userId'
    });
  };
  return favourite;
};

