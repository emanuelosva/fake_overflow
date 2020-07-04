'use strict'

const { questionsModel } = require('../models');

const setAnswerRight = async (questionId, answerId, user) => {
  try {
    const result = await questionsModel
      .setAnswerRight(questionId, answerId, user);

    return result
  } catch (error) {
    console.error(`[methodQuestion] ${error}`);
    return false;
  }
};

const getLast = async (amount) => {
  let data;
  try {
    data = await questionsModel.getLast(amount);
  } catch (error) {
    console.error(`[serverMethodGetLast] ${error}`);
  }

  return data;
};

module.exports = {
  setAnswerRight: setAnswerRight,
  getLast: getLast,
};
