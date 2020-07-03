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

module.exports = {
  createQuestion,
};
