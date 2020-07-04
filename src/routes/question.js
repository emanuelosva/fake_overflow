'use strict';

const questionController = require('../controllers/question');
const questionSchema = require('../schemas/question');
const { fileNotFound } = require('../controllers/site');

module.exports = [

  // Save new Question
  {
    method: 'POST',
    path: '/new-question',
    options: {
      payload: {
        parse: true,
        multipart: true,
      },
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

  // Set right aswer
  {
    method: 'GET',
    path: '/answer/{questionId}/{answerId}',
    handler: questionController.setAnswerRight,
  },

];
