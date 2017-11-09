module.exports = (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {

  });
  Upvote.associate = (models) => {
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
