'use strict';

const { writeFile } = require('fs')
const { promisify } = require('util');
const { join } = require('path');
const { v1: uuidv1 } = require('uuid');
const { questionsModel } = require('../models');
const { internalServerErrorResponse } = require('./site');

// Write async with promise
const write = promisify(writeFile);

const createQuestion = async (req, h) => {
  if (!req.state.user) return h.redirect('/login');
  try {
    const data = { ...req.payload };
    let filename;

    if (Buffer.isBuffer(data.image)) {
      filename = `${uuidv1()}.png`;
      await write(
        join(__dirname, '..', '..', 'public', 'uploads', filename),
        data.image,
      );
    }

    const result = await questionsModel
      .create(data, req.state.user, filename);

    return h.redirect(`/question?id=${result}`);
  } catch (error) {
    req.log('QuestionController-Error', error);

    return h.view('ask', {
      title: 'Nueva pregunta - Error',
      error: 'Problemas creando la pregunta',
    }).code(500).takeover();
  }
};

const answerQuestion = async (req, h) => {
  if (!req.state.user) return h.redirect('/login');

  try {
    const result = await questionsModel
      .addAnswer(req.payload, req.state.user);

    return h.redirect(`/question?id=${req.payload.id}`);
  } catch (error) {
    req.log('QuestionController-Error', error);
    return internalServerErrorResponse(req, h);
  }
};

const setAnswerRight = async (req, h) => {
  if (!req.state.user) return h.redirect('/login');

  try {
    const result = await req.server
      .methods
      .setAnswerRight(
        req.params.questionId,
        req.params.answerId,
        req.state.user
      );

    return h.redirect(`/question?id=${req.params.questionId}`);
  } catch (error) {
    req.log('QuestionController-Error', error);
    return internalServerErrorResponse(req, h);
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
  answerQuestion,
  setAnswerRight,
  failValidation,
};
