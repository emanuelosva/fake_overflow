'use strict'

const userController = require('../controllers/user');
const userSchema = require('../schemas/user');

module.exports = [
  // Create user by POST
  {
    method: 'POST',
    path: '/singup',
    options: {
      validate: {
        payload: userSchema.userRegisterSchema,
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
        payload: userSchema.userLoginSchema,
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
