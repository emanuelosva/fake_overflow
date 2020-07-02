/**
 * @fileoverview Users controller
*/
'use strict'

const Boom = require('@hapi/boom');
const { usersModel } = require('../models');

const createUser = async (req, h) => {
  try {
    const result = await usersModel.create({ ...req.payload });

    return h.redirect('/login');
  } catch (error) {
    console.error(`[usersController] Error: ${error}`);
    return h.view('register', {
      title: 'Registro',
      error: 'Error creando el usuario',
    });
  }
};

const loginUser = async (req, h) => {
  try {
    const result = await usersModel.validateUser({ ...req.payload });

    if (!result) {
      return h.view('login', {
        title: 'Login - Error',
        error: 'Credenciales invalidas',
      })
    }

    return h.redirect('/')
      .state('user', {
        name: result.name,
        email: result.email,
      });
  } catch (error) {
    console.error(`[usersController] Error: ${error}`);
    return h.view('500', {
      title: 'Internal Error',
      error: 'Probelmas del servidor',
      message: 'Lo resolveremos lo anter posible',
    })
  }
};

const logoutUser = async (req, h) => {
  return h.redirect('/login').unstate('user');
};

const failValidation = async (req, h, err) => {
  return Boom.badRequest('Validación fallida', req.payload);
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  failValidation,
};
