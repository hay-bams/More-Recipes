'use strict';

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      id: '1',
      firstName: 'Ayobami',
      lastName: 'Adelakun',
      image: 'test-image',
      email: 'purposenigeria@gmail.com',
      password: 'password',
      createdAt: '2017-09-28 01:00:00',
      updatedAt: '2017-09-28 01:00:00'
    }, {
      id: '2',
      firstName: 'Oladimeji',
      lastName: 'Adelakun',
      image: 'test-image',
      email: 'purpose4nigeria@gmail.com',
      password: 'password',
      createdAt: '2015-09-28 01:00:00',
      updatedAt: '2015-09-28 01:00:00'
    }], {});
  },

  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};