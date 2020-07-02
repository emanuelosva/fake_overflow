'use strict'

const userController = require('../controllers/user');

module.exports = [
  // Create user by POST
  {
    method: 'POST',
    path: '/user/sing-in',
    handler: userController.registerUser,
  },
];
