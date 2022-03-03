const Sequelize = require('sequelize');
const Physician = require('../models/Physician');

class Appointment extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        physicianId: Sequelize.INTEGER.UNSIGNED,
        patientId: Sequelize.INTEGER.UNSIGNED,
        appointmentDate: Sequelize.DATE,
        description: Sequelize.STRING,
      },
      { sequelize }
    );
  }

  static associate(models) {}
}

module.exports = Appointment;
