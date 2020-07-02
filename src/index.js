'use strict';

const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const handlebars = require('handlebars');
const path = require('path');
const config = require('../config');

const siteRoutes = require('./routes/site');
const userRoutes = require('./routes/user');


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

    // Template engine settings
    server.views({
      engines: { hbs: handlebars },
      relativeTo: path.join(__dirname, '..'),
      path: 'views',
      layout: true,
      layoutPath: 'views',
    });

    // Routes
    server.route(siteRoutes);
    server.route(userRoutes);

    // Start server
    await server.start();
    console.log(`Server running on ${server.info.uri}`);

  } catch (error) {
    console.error(`Server error: ${err}`);
    process.exit(1);
  }
};

// Server execution
init();
