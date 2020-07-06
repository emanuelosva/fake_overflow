'use estrict';

const schemas = require('./schemas');
const apiControllers = require('./controllers');

module.exports = {
  name: 'api-rest',
  version: '1.0.0',
  async register(server, options) {
    const prefix = options.prefix || 'api';

    // Api Routes
    server.route([

      // Get a question by id
      {
        method: 'GET',
        path: `/${prefix}/question/{key}`,
        options: {
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
