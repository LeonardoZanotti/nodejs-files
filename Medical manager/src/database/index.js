const Sequelize = require('sequelize');
const dbConfig = require('./config/dbconfig');

const Physician = require('../models/Physician');
const Appointment = require('../models/Appointment');

const connection = new Sequelize(dbConfig);

Physician.init(connection);
Appointment.init(connection);

Physician.associate(connection);
Appointment.associate(connection);

module.exports = connection;
