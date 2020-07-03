/**
 * @fileoverview Router
*/
'use strict'

const siteController = require('../controllers/site');

module.exports = [
  // Static files
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

  // Login view
  {
    method: 'GET',
    path: '/login',
    handler: siteController.renderLoginView,
  },

  // Create question view
  {
    method: 'GET',
    path: '/new-question',
    handler: siteController.renderQuestionView,
  },

  // 404 view
  {
    method: ['GET', 'POST'],
    path: '/{any*}',
    handler: siteController.notFoundResponse,
  },
];
