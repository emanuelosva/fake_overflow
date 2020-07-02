'use strict'

const userController = require('../controllers/user');
const validSchema = require('../schemas/user');

module.exports = [
  // Create user by POST
  {
    method: 'POST',
    path: '/user/singup',
    options: {
      validate: {
        payload: validSchema.userRegisterSchema,
      }
    },
    handler: userController.createUser,
  },

  // Login user
  {
    method: 'POST',
    path: '/user/login',
    options: {
      validate: {
        payload: validSchema.userLoginSchema,
      }
    },
    handler: userController.validateUser,
  },
];
