'use strict';

const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const path = require('path');
const config = require('../config');


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

  // Plugins
  try {
    await server.register(inert);
  } catch (error) {
    console.error(`Plugin register error: ${error}`);
  }

  // Routes
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['index.html']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => h.redirect(`${server.info.uri}/home`)
  });

  server.route({
    method: 'GET',
    path: '/home',
    handler: (req, h) => h.file('index.html')
  });


  // Try to up server
  try {
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
  } catch (error) {
    console.error(`Server error: ${err}`);
    process.exit(1);
  }
};

// Server execution
init();
