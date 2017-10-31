'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: '6061feae-be11-4f64-accb-d135f5ee03d1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'demo@demos.com',
      password: 'abc',
      confirmPassword: 'abc',
      createdAt: '2001-09-28 01:00:00',
      updatedAt: '2001-09-28 01:00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {   
    return queryInterface.bulkDelete('Users', null, {});   
  }
};
