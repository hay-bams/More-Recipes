module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipeId: {
        type: Sequelize.INTEGER
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
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
      },
      recipeId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Recipe',
          key: 'id',
      }
    });
  },
  down: queryInterface => queryInterface.dropTable('Reviews')
};
