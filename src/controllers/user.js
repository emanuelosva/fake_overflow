/**
 * @fileoverview Users controller
*/
'use strict'

const { usersModel } = require('../models');

const createUser = async (req, h) => {
  try {
    const result = await usersModel.create({ ...req.payload });

    if (!result) {
      return h.response('Internal Error').code(500);
    }

    return h.redirect('/login');
  } catch (error) {
    console.error(`[usersController] Error: ${error}`);
    return h.response('Problemas creando el usuario').code(500)
  }
};

const validateUser = async (req, h) => {
  try {
    const result = await usersModel.validateUser({ ...req.payload });

    if (!result) {
      return h.response('Credenciales invalidas').code(401)
    }

    return h.redirect('/')
      .state('user', {
        name: result.name,
        email: result.email,
      });
  } catch (error) {
    console.error(`[usersController] Error: ${error}`);
    return h.response('Internal server error').code(500)
  }
};

module.exports = {
  createUser,
  validateUser
};
