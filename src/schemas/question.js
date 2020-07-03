'use strict'

const Joi = require('@hapi/joi');

const validQuestion = Joi.object({
  title: Joi.string().min(4).max(100).required(),
  description: Joi.string().required(),
});

module.exports = {
  validQuestion,
};
