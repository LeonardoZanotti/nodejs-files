'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Physician',
      [
        {
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password: bcrypt.hashSync('s4trongpassword.', salt),
        },
        {
          name: 'Regina da Silva',
          email: 'rdasilva@gmail.com',
          password: bcrypt.hashSync('coxinha123', salt),
        },
        {
          name: 'Rodrigo Alberto',
          email: 'rodrigoalberto@hotmail.com',
          password: bcrypt.hashSync('12345678Aa', salt),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Physician', null, {});
  },
};
