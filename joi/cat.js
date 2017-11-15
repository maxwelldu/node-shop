const Joi = require('joi');

module.exports = {
  add: Joi.object({
    title: Joi.string().min(2).max(10).required(),
    token: Joi.string()
  })
}
