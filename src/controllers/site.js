/**
 * @fileoverview Site controller
*/
'use strict'

const renderHomeView = (req, h) => {
  return h.view('index', { title: 'Home' });
}

const renderRegisterView = (req, h) => {
  return h.view('register', { title: 'Registro' });
};

module.exports = {
  renderHomeView,
  renderRegisterView,
};
