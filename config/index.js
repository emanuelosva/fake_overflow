/**
 * @fileoverview Configuration settings and Env variables
*/

require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
};
