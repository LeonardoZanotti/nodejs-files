const Sequelize = require('sequelize');

class Appointment extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        appointmentDate: Sequelize.DATE,
        description: Sequelize.STRING,
      },
      { sequelize }
    );
  }

  static associate(models) {}
}

module.exports = Appointment;
