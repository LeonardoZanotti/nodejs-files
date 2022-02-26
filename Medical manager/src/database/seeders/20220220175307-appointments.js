'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Appointment',
      [
        {
          physicianId: 1,
          patientId: 2,
          appointmentDate: '2022-03-05 14:35:15',
          description: 'Consulta',
        },
        {
          physicianId: 2,
          patientId: 1,
          appointmentDate: '2022-04-10 12:20:10',
          description: 'Cirurgia',
        },
        {
          physicianId: 3,
          patientId: 3,
          appointmentDate: '2022-03-05 18:00:00',
          description: 'Reconsulta',
        },
        {
          physicianId: 1,
          patientId: 3,
          appointmentDate: '2022-03-25 08:00:00',
          description: 'Consulta de novo',
        },
        {
          physicianId: 2,
          patientId: 1,
          appointmentDate: '2022-04-17 09:30:00',
          description: 'Cirurgia muito grave',
        },
        {
          physicianId: 3,
          patientId: 2,
          appointmentDate: '2022-03-15 20:45:00',
          description: 'Reconsulta',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Appointment', null, {});
  },
};
