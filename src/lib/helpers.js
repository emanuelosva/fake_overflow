'use strict'

const handlebars = require('handlebars');

// Handlerbasr heleper
const registerHelpers = () => {
  handlebars.registerHelper('numAnswers', (answers) => {
    return Object.keys(answers).length;
  });

  handlebars.registerHelper('ifEquals', (a, b, options) => {
    if (a === b) return options.fn(this);
    return options.inverse(this);
  });

  return handlebars
};

module.exports = registerHelpers();
