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
      });
    }

    return h.redirect('/')
      .state('user', {
        name: result.name,
        email: result.email,
      });
  } catch (error) {
    console.error(`[usersController] Error: ${error}`);

    return h.view('500', {}, { layout: 'error-layout' });
  }
};

const logoutUser = async (req, h) => {
  return h.redirect('/login').unstate('user');
};

const failValidation = async (req, h, err) => {
  const accept = req.headers.accept;

  if (accept && accept.match(/json/)) {
    return Boom.badRequest('Validación fallida', req.payload);
  }

  const routes = {
    '/login': 'login',
    '/register': 'register',
  };
  const view = routes[req.path];

  return h.view(view, {
    title: 'Error de validación',
    error: 'El correo y contraseña deben de tener un formato valido.'
  }).code(400).takeover();

};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  failValidation,
};
