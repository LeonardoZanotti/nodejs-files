const Sequelize = require('sequelize');

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

  static associate(models) {
    this.belongsTo(models.Physician, { as: 'appointmentsPhysician', foreignKey: 'physicianId' });
    this.belongsTo(models.Patient, { as: 'appointmentsPatient', foreignKey: 'patientId' });
  }
}

module.exports = Appointment;
