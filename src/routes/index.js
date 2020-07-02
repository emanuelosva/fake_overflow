/**
 * @fileoverview Router
*/
'use strict'

const siteController = require('../controllers/site');
const userController = require('../controllers/user');


module.exports = [
  {
    method: 'GET',
    path: '/{param*}',
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

  // Create user by POST
  {
    method: 'POST',
    path: '/sing-in',
    handler: userController.registerUser,
  },
];
