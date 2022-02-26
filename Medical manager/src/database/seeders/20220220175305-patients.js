'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Patient',
      [
        {
          name: 'Joaquim',
          email: 'joaquimquim@gmail.com',
          phone: '991222356',
        },
        {
          name: 'Homer',
          email: 'homersimpsom@hotmail.com',
          phone: '999991234',
        },
        {
          name: 'Magali',
          email: 'magalimelancia@gmail.com',
          phone: '987651234',
        },
        {
          name: 'Joaquim 2',
          email: 'joaquimquim2@hotmail.com',
          phone: '99122332356',
        },
        {
          name: 'Homer 2',
          email: 'homersimpsom2@gmail.com',
          phone: '99932991234',
        },
        {
          name: 'Magali 2',
          email: 'magalimelancia2@gmail.com',
          phone: '98732651234',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Patient', null, {});
  },
};
