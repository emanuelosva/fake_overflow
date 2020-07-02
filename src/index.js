'use strict';

const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const handlebars = require('handlebars');
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
    await server.register(vision);
  } catch (error) {
    console.error(`Plugin register error: ${error}`);
  }

  // Template engine settings
  server.views({
    engines: { hbs: handlebars },
    relativeTo: path.join(__dirname, '..'),
    path: 'views',
    layout: true,
    layoutPath: 'views',
  })

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
    handler: (req, h) => {
      return h.view('index', { title: 'Home' })
    }
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
