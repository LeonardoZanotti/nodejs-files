const physicianSchema = require('../schemas/physicianSchema');

const validateRequest = (req, res, next) => {
  if (
    ((req.route.path === '/authentication' || req.route.path === '/newPhysician') &&
      (!req.body.email || !req.body.password)) ||
    (req.route.path === '/newPhysician' && !req.body.name) ||
    (req.route.path === '/updatePhysician' && (!req.body.name || !req.body.email))
  )
    return res.status(422).json({ error: 'Campos obrigatórios não preenchidos! ' });

  if ((req.route.path === '/updatePhysician' || req.route.path === '/deletePhysician') && !req.params.id)
    return res.status(422).json({ error: 'ID inválido!' });

  const { error } = physicianSchema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details });

  next();
};

module.exports = validateRequest;
