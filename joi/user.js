const Joi = require('joi');

module.exports = {
  checkUserNameUnique: Joi.object({
    username: Joi.string().min(3).max(10).required(),
    site: Joi.string().required()
  }),
  register: Joi.object({
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().min(6).max(18).required(),
    site: Joi.string().required()
  }),
  auth: Joi.object({
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().min(6).max(18).required(),
    site: Joi.string().required()
  })
}
