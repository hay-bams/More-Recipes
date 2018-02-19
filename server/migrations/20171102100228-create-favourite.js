module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Favourites', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Recipes',
          key: 'id',
          as: 'recipeId'
        },
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
          key: 'id',
          as: 'userId'
        },
      }
    }),
  down: queryInterface => queryInterface.dropTable('Favourites')
};
