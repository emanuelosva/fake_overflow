'use strict';

const Boom = require('@hapi/boom');
const { questionsModel, usersModel } = require('../../models');
const { server } = require('@hapi/hapi');

// Route Handlers

const getOne = async (req, h) => {
  let result;
  const id = req.params.key;
  try {
    result = await questionsModel.getOne(id);
    !result
      ? result = Boom.notFound(`No se pudo encontrar la pregunta : ${id}`)
      : null;
  } catch (error) {
    req.log('Api-Error', error);
    return Boom.badImplementation(`Hubo un error buscando: ${id}`)
  }

  return result;
};

const getLast = async (req, h) => {
  let result;
  const amount = req.params.amount;
  try {
    result = await questionsModel.getLast(amount);
    !result
      ? result = Boom.notFound(`No se pudo recuperar las preguntas`)
      : null;
  } catch (error) {
    req.log('Api-Error', error);
    return Boom.badImplementation(`Hubo un error buscando las preguntas`)
  }

  return result;
};


// Validation route params
const failValidation = (req, h, err) => {
  return Boom.badRequest('Por favor intruduzca los parámetros correctos')
};


// API auth
const validateAuth = async (req, username, password, h) => {
  let user;
  try {
    user = await usersModel
      .validateUser({
        email: username,
        password: password,
      });
  } catch (error) {
    server.log('Api-Error', error);
  }

  return {
    credentials: user || {},
    isValid: (user !== false),
  };
};


module.exports = {
  getOne,
  getLast,
  failValidation,
  validateAuth,
};
