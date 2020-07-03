/**
 * @fileoverview Site controller
*/
'use strict'

const user = require("./user");
const Boom = require("@hapi/boom");

const { questionsModel } = require('../models');

const renderHomeView = async (req, h) => {
  try {
    const amountQuestions = 10;
    const data = await questionsModel.getLast(amountQuestions);

    return h.view('index', {
      title: 'Home',
      user: req.state.user,
      questions: data,
      error: null,
    });
  } catch (error) {
    console.error(`[HomeView] ${error}`);

    return h.view('index', {
      title: 'Home',
      user: req.state.user,
      questions: null,
      error: 'Error al cargar las preguntas',
    });
  }
}

const renderRegisterView = (req, h) => {
  if (req.state.user) return h.redirect('/');

  return h.view('register', {
    title: 'Registro',
    user: req.state.user
  });
};

const renderLoginView = (req, h) => {
  if (req.state.user) return h.redirect('/');

  return h.view('login', {
    title: 'Login',
    user: req.state.user
  });
};

const renderQuestionView = async (req, h) => {
  if (!req.state.user) {
    return h.redirect('/login');
  }

  return h.view('ask', {
    title: 'Nueva pregunta',
    user: req.state.user
  });
};

const notFoundResponse = (req, h) => {
  const accept = req.headers.accept

  if (accept && accept.match(/json/)) {
    return Boom.notFound('Lo siento, este recurso no está disponible');
  }

  return h.view('404', {}, { layout: 'error-layout' }).code(404);
};

const fileNotFound = (req, h) => {
  const response = req.response;
  if (response.isBoom && response.output.statusCode === 404) {
    return h.view('404', {}, { layout: 'error-layout' }).code(404);
  }

  return h.continue;
};

module.exports = {
  renderHomeView,
  renderRegisterView,
  renderLoginView,
  renderQuestionView,
  notFoundResponse,
  fileNotFound,
};
