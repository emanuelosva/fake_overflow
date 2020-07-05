'use strict';

const Boom = require('@hapi/boom');
const { questionsModel } = require('../../models');

const getOne = async (req, h) => {
  let result;
  const id = req.params.id;
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

const failValidation = (req, h, err) => {
  return Boom.badRequest('Por favor intruduzca los parámetros correctos')
};


module.exports = {
  getOne,
  getLast,
  failValidation,
};
