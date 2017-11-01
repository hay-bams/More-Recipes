module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ingredients: {
        type: Sequelize.STRING,
        allowNull: false
      },
      instructions: {
        type: Sequelize.STRING,
        allowNull: false
      },
      upvote: {
        type: Sequelize.STRING,
        defaultValue: 0,
        allowNull: false
      },
      downvote: {
        type: Sequelize.STRING,
        defaultValue: 0,
        allowNull: false
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
    }),
  down: queryInterface => queryInterface.dropTable('Recipes')
};
