/**
 * @fileoverview Users controller
*/
'use strict'

const { usersModel } = require('../models');

const createUser = async (req, h) => {
  try {
    const result = await usersModel.create({ ...req.payload });

    return h.response(`Usuario creado. ID: ${result}`);
  } catch (error) {
    console.error(`[usersController] Error: ${error}`);
    return h.response('Problemas creando el usuario').code(500)
  }
};

const validateUser = async (req, h) => {
  try {
    const result = await usersModel.validateUser({ ...req.payload });

    return result;
  } catch (error) {
    console.error(`[usersController] Error: ${error}`);
    return h.response('Unauthorized').code(500)
  }
};

module.exports = {
  createUser,
  validateUser
};
