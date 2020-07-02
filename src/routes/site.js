/**
 * @fileoverview Router
*/
'use strict'

const siteController = require('../controllers/site');

module.exports = [
  {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['index.html']
      }
    }
  },

  // Home view
  {
    method: 'GET',
    path: '/',
    handler: siteController.renderHomeView,
  },

  // Sing in view
  {
    method: 'GET',
    path: '/register',
    handler: siteController.renderRegisterView,
  },

  // login view
  {
    method: 'GET',
    path: '/login',
    handler: siteController.renderLoginView,
  },

  {
    method: ['GET', 'POST'],
    path: '/{any*}',
    handler: siteController.notFoundResponse,
  },
];
