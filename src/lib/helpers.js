'use strict'

const handlebars = require('handlebars');

// Handlerbasr heleper
const registerHelpers = () => {
  handlebars.registerHelper('numAnswers', (answers) => {
    return Object.keys(answers).length;
  });

  return handlebars
};

module.exports = registerHelpers();
