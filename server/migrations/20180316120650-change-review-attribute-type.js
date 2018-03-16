'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn(
      'Reviews', 'review',
      { type: Sequelize.TEXT, allowNull: false }
    ),

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
      'Reviews', 'review',
      {
        type: Sequelize.STRING,
        allowNull: false
      },
    );
  }
};
