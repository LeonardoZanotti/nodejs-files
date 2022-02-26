'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Physician',
      [
        {
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password: 'strongpassword.',
        },
        {
          name: 'Regina da Silva',
          email: 'rdasilva@gmail.com',
          password: 'coxinha123',
        },
        {
          name: 'Rodrigo Alberto',
          email: 'rodrigoalberto@hotmail.com',
          password: '12345678Aa',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Physician', null, {});
  },
};
