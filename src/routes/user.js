'use strict'

const userController = require('../controllers/user');
const validSchema = require('../schemas/user');

module.exports = [
  // Create user by POST
  {
    method: 'POST',
    path: '/user/sing-in',
    options: {
      validate: {
        payload: validSchema.userRegisterSchema,
      }
    },
    handler: userController.registerUser,
  },
];
