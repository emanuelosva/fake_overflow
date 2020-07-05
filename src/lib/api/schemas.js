'use strict'

const Joi = require('@hapi/joi');

const getOneSchema = Joi.object({
  key: Joi.string()
    .required(),
});

const getLastSchema = Joi.object({
  amount: Joi.number()
    .integer()
    .min(1)
    .max(30)
    .required(),
});

module.exports = {
  getOneSchema,
  getLastSchema,
};
