'use strict';

const Hapi = require('@hapi/hapi');
const crumb = require('@hapi/crumb');
const Scooter = require('@hapi/scooter');
const Blankie = require('blankie');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const good = require('@hapi/good');
const HapiSwagger = require('hapi-swagger');
const hapiDevErrors = require('hapi-dev-errors');
const handlebars = require('./lib/helpers');
const path = require('path');
const config = require('../config');
const methods = require('./lib/methods');

const siteController = require('./controllers/site');

const siteRoutes = require('./routes/site');
const userRoutes = require('./routes/user');
const questionRoutes = require('./routes/question');

const time = require('./utils/time');

// Server initialization
const init = async () => {

  // Server definition
  const server = Hapi.server({
    port: config.port,
    host: config.host,
    routes: {
      files: { relativeTo: path.join(__dirname, '..', 'public') }
    }
  });

  // Try to up server
  try {
    // Plugins
    await server.register(inert);
    await server.register(vision);

    await server.register({
      plugin: good,
      options: {
        reporters: {
          console: [
            {
              module: '@hapi/good-console',
            },
            'stdout'
          ]
        },
      }
    });

    await server.register({
      plugin: crumb,
      options: {
        cookieOptions: {
          isSecure: process.env.NODE_ENV === 'production'
        }
      },
    });

    await server.register([Scooter, {
      plugin: Blankie,
      options: {
        defaultSrc: `'self' 'unsafe-inline'`,
        styleSrc: `'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com`,
        fontSrc: `'self' 'unsafe-inline' data:`,
        scriptSrc: `'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://maxcdn.bootstrapcdn.com/ https://code.jquery.com/`,
        generateNonces: false,
      },
    }]);

    await server.register({
      plugin: hapiDevErrors,
      options: {
        showErrors: process.env.NODE_ENV !== 'production'
      }
    });

    // API plugins
    await server.register({
      plugin: HapiSwagger,
      options: {
        documentationPath: '/api/documentation',
        basePath: '/api',
        info: {
          'title': 'Api Documentation',
        }
      },
    })

    await server.register({
      plugin: require('./lib/api'),
      options: { prefix: 'api' }
    });

    // Server methods
    server.method('setAnswerRight', methods.setAnswerRight);
    server.method('getLast', methods.getLast, {
      cache: {
        expiresIn: time.MINUTE_IN_MILESECODS,
        generateTimeout: 2000,
      },
    });

    //  Cokies
    server.state('user', {
      ttl: time.DAY_IN_MILISECODS * 3,
      isSecure: process.env.NODE_ENV === 'production',
      encoding: 'base64json',
    });

    // Template engine settings
    server.views({
      engines: { hbs: handlebars },
      relativeTo: path.join(__dirname, '..'),
      path: 'views',
      layout: true,
      layoutPath: 'views',
    });

    // Routes
    server.ext('onPreResponse', siteController.fileNotFound);
    server.route(userRoutes);
    server.route(questionRoutes);
    server.route(siteRoutes);

    // Start server
    await server.start();
    server.log('info', `Server running on ${server.info.uri}`);

  } catch (error) {
    server.log('ServerError', error);
    process.exit(1);
  }
};

// Unhandle errors
process.on('unhandledRejection', err => {
  console.error(`[UnhandleRejection] -> ${err.message}`, err);
  process.exit(1);
});

process.on('uncaughtException', err => {
  console.error(`[uncaughtException] -> ${err.message}`, err);
  process.exit(1);
});

// Server execution
init();
