const Joi = require('joi');

const patientSchema = Joi.object().keys({
  id: Joi.number().integer(),
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'br'] },
    })
    .required(),
  phone: Joi.string()
    .min(8)
    .pattern(/^(?:\+?[1-9]{1,3})?\s?\(?[1-9]{2}\)?\s?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/i)
    .required(),
  // +55 (41) 9XXXX-XXXX
});

module.exports = patientSchema;
