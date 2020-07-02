/**
 * @fileoverview Site controller
*/
'use strict'

const user = require("./user");
const Boom = require("@hapi/boom");

const renderHomeView = (req, h) => {
  return h.view('index', {
    title: 'Home',
    user: req.state.user
  });
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
  notFoundResponse,
  fileNotFound,
};
