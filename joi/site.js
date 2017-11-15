const Joi = require('joi');

module.exports = {
  add: Joi.object({
    name: Joi.string().min(2).required(),
    desc: Joi.string(),
    url: Joi.string(),
    token: Joi.string()
  })
}
