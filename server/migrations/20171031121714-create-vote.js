module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Votes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      upvotes: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      recipeId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Recipes',
          key: 'id'
        },
      },
    }),
  down: (queryInterface) => {
    return queryInterface.dropTable('Votes');
  }
};
