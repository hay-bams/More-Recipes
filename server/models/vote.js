module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    upvotes: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    downvotes: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
  Vote.associate = (models) => {
    Vote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });

    Vote.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Vote;
};
