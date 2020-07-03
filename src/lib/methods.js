'use strict'

const { questionsModel } = require('../models');

const setAnswerRight = async (questionId, answerId, user) => {
  try {
    const result = await questionsModel
      .setRightAnswer(questionId, answerId, user);

    return result
  } catch (error) {
    console.error(`[methodQuestion] ${error}`);
    return false;
  }
};

module.exports = {
  setAnswerRight: setAnswerRight,
};
