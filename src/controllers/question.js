'use strict';

const { questionsModel } = require('../models');

const createQuestion = async (req, h) => {
  try {
    const result = await questionsModel
      .create({ ...req.payload }, req.state.user);

    return h.response(`Pregunta creada. ID: ${result}`).code(200);
  } catch (error) {
    console.error(`[questionController] Error: ${error}`);

    return h.view('ask', {
      title: 'Nueva pregunta - Error',
      error: 'Problemas creando la pregunta',
    }).code(500).takeover();
  }
};

const failValidation = async (req, h, err) => {
  const accept = req.headers.accept;

  if (accept && accept.match(/json/)) {
    return Boom.badRequest('Validación fallida', req.payload);
  }

  const routes = {
    '/new-question': 'ask',
  };

  const view = routes[req.path];

  return h.view(view, {
    title: 'Error de validación',
    error: 'La pregunta no tiene un formato valido',
  }).code(400).takeover();

};

module.exports = {
  createQuestion,
  failValidation,
};
