/**
 * @fileoverview Site controller
*/
'use strict'

const user = require("./user");

const renderHomeView = (req, h) => {
  return h.view('index', {
    title: 'Home',
    user: req.state.user
  });
}

const renderRegisterView = (req, h) => {
  return h.view('register', {
    title: 'Registro',
    user: req.state.user
  });
};

const renderLoginView = (req, h) => {
  return h.view('login', {
    title: 'Login',
    user: req.state.user
  });
};

module.exports = {
  renderHomeView,
  renderRegisterView,
  renderLoginView,
};
