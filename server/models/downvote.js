module.exports = (sequelize, DataTypes) => {
  const Downvote = sequelize.define('Downvote', {

  });
  Downvote.associate = (models) => {
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
