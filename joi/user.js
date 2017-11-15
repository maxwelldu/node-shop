const Joi = require('joi');

module.exports = {
  register: Joi.object({
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().min(6).max(18).required()
  }),
  auth: Joi.object({
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().min(6).max(18).required()
  })
}
