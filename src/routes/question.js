'use strict';

const questionController = require('../controllers/question');
const questionSchema = require('../schemas/question');

module.exports = [

  // Save new Question
  {
    method: 'POST',
    path: '/new-question',
    options: {
      validate: {
        payload: questionSchema.validQuestion,
        failAction: questionController.failValidation,
      },
    },
    handler: questionController.createQuestion,
  },

  // Add new aswer to Question
  {
    method: 'POST',
    path: '/answer-question',
    options: {
      validate: {
        payload: questionSchema.validAnswer,
        failAction: questionController.failValidation,
      },
    },
    handler: questionController.answerQuestion,
  },

];
