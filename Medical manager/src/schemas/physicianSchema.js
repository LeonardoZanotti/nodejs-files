const Joi = require('joi');

const physicianSchema = Joi.object().keys({
  id: Joi.number().integer(),
  name: Joi.string(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'br'] },
    })
    .required(),
  password: Joi.string()
    .min(8)
    .pattern(/^([\d]+[a-z]|[a-z]+[\d])[\da-z]*$/i)
    .required(),
});

module.exports = physicianSchema;
