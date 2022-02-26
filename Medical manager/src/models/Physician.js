const Sequelize = require('sequelize');
const Appointment = require('../models/Appointment');

class Physician extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.hasMany(Appointment, { as: 'appointments', foreignKey: 'physicianId' });
  }
}

module.exports = Physician;
