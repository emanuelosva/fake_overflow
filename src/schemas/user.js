'use strict'

const Joi = require('@hapi/joi');

const userRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(64).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,40}$')),
});

module.exports = {
  userRegisterSchema,
};
