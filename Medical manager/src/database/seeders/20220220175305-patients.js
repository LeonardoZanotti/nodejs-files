'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "patients",
      [
        {
          name: "Joaquim",
          email: "joaquimquim@gmail.com",
          phone: "991222356"
        },
        {
          name: "Homer",
          email: "homersimpsom@hotmail.com",
          phone: "999991234"
        },
        {
          name: "Magali",
          email: "magalimelancia@gmail.com",
          phone: "987651234"
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("patients", null, {});
  }
};
