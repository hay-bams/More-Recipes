module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};
