const Joi = require('joi');

const physicianSchema = Joi.object().keys({
  id: Joi.number().integer(),
  physicianId: Joi.number().integer().required(),
  patientId: Joi.number().integer().required(),
  description: Joi.string().required(),
  appointmentDate: Joi.date().required(),
});

module.exports = physicianSchema;
