const patientSchema = require('../schemas/patientSchema');

const validateRequest = (req, res, next) => {
  if (
    (req.route.path === '/newPatient' || req.route.path === '/updatePatient') &&
    (!req.body.email || !req.body.name || !req.body.phone)
  )
    return res.status(422).json({ error: 'Campos obrigatórios não preenchidos! ' });

  if ((req.route.path === '/updatePatient' || req.route.path === '/searchPatientByPhysicianId') && !req.params.id)
    return res.status(422).json({ error: 'ID inválido!' });

  if (req.route.path === '/searchPatientByName' && !req.params.name)
    return res.status(422).json({ error: 'Nome inválido!' });

  const { error } = patientSchema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details });

  next();
};

module.exports = validateRequest;
