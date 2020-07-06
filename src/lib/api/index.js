'use estrict';

const authBasic = require('@hapi/basic');
const schemas = require('./schemas');
const apiControllers = require('./controllers');

module.exports = {
  name: 'api-rest',
  version: '1.0.0',
  async register(server, options) {
    const prefix = options.prefix || 'api';

    // Plugins
    await server.register(authBasic);

    // Auth
    server.auth.strategy('simple', 'basic', {
      validate: apiControllers.validateAuth
    })

    // Api Routes
    server.route([

      // Get a question by id
      {
        method: 'GET',
        path: `/${prefix}/question/{key}`,
        options: {
          auth: 'simple',
          validate: {
            params: schemas.getOneSchema,
            failAction: apiControllers.failValidation,
          },
        },
        handler: apiControllers.getOne,
      },

      // Get the first -amount- questions
      {
        method: 'GET',
        path: `/${prefix}/questions/{amount}`,
        options: {
          auth: 'simple',
          validate: {
            params: schemas.getLastSchema,
            failAction: apiControllers.failValidation,
          },
        },
        handler: apiControllers.getLast,
      },
    ]);
  }
};
