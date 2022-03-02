const Sequelize = require('sequelize');
const dbConfig = require('./config/dbconfig');

const Physician = require('../models/Physician');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

const connection = new Sequelize(dbConfig);

Physician.init(connection);
Patient.init(connection);
Appointment.init(connection);

Physician.associate(connection);
Patient.associate(connection);
Appointment.associate(connection);

module.exports = connection;
