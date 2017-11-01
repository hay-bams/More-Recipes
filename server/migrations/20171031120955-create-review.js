module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
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
  down: queryInterface => queryInterface.dropTable('Reviews')
};
