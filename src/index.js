'use strict';

const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const good = require('@hapi/good');
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
