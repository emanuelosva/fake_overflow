'use strict'

const userController = require('../controllers/user');
const validSchema = require('../schemas/user');

module.exports = [
  // Create user by POST
  {
    method: 'POST',
    path: '/singup',
    options: {
      validate: {
        payload: validSchema.userRegisterSchema,
        failAction: userController.failValidation,
      },
    },
    handler: userController.createUser,
  },

  // Login user
  {
    method: 'POST',
    path: '/login',
    options: {
      validate: {
        payload: validSchema.userLoginSchema,
        failAction: userController.failValidation,
      },
    },
    handler: userController.loginUser,
  },

  // Logout user
  {
    method: 'GET',
    path: '/logout',
    handler: userController.logoutUser,
  },
];
