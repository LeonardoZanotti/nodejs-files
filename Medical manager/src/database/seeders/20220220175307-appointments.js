'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Appointments',
      [
        {
          physicianId: 1,
          patientId: 2,
          appointmentDate: '2022-03-05',
          description: 'Consulta',
        },
        {
          physicianId: 2,
          patientId: 1,
          appointmentDate: '2022-04-10',
          description: 'Cirurgia',
        },
        {
          physicianId: 3,
          patientId: 3,
          appointmentDate: '2022-03-05',
          description: 'Reconsulta',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('appointments', null, {});
  },
};
