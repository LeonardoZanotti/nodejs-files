const Sequelize = require('sequelize');
const Appointment = require('../models/Appointment');

class Patient extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.hasMany(Appointment, { as: 'appointments', foreignKey: 'patientId' });
  }
}

module.exports = Patient;