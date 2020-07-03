'use strict';

const questionController = require('../controllers/question');

module.exports = [

  // Save new Question
  {
    method: 'POST',
    path: '/new-question',
    handler: questionController.createQuestion,
  },
];
