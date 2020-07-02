'use strict';

const Hapi = require('@hapi/hapi');
const config = require('../config');


// Server initialization
const init = async () => {

  const server = Hapi.server({
    port: config.port,
    host: config.host,
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return h.response('Hello, world!').code(200);
    }
  });

  server.route({
    method: 'GET',
    path: '/redirect',
    handler: (req, h) => h.redirect('https://platzi.com')
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
