const appointmentSchema = require('../schemas/appointmentSchema');

const validateRequest = (req, res, next) => {
  if (
    req.route.path === '/newAppointment' &&
    (!req.body.physicianId || !req.body.patientId || !req.body.appointmentDate || !req.body.description)
  )
    return res.status(422).json({ error: 'Campos obrigatórios não preenchidos! ' });

  if (
    (req.route.path === '/searchAppointmentByPatientId' ||
      req.route.path === '/searchAppointmentByPhysicianId' ||
      req.route.path === '/deleteAppointment') &&
    !req.params.id
  )
    return res.status(422).json({ error: 'ID inválido!' });

  const { error } = appointmentSchema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details });

  next();
};

module.exports = validateRequest;
