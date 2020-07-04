'use strict';

class Questions {
  constructor(db) {
    this.db = db;
    this.ref = this.db.ref('/');
    this.collection = this.ref.child('questions');
  };

  async getLast(amount) {
    const query = await this.collection
      .limitToLast(amount)
      .once('value');

    const data = query.val();

    let orderedData = {};
    Object.keys(data)
      .reverse()
      .map(key => orderedData[key] = data[key]);

    return orderedData;
  };

  async getOne(id) {
    const query = await this.collection
      .child(id)
      .once('value');

    const data = query.val();
    return data;
  };

  async create(info, user, filename) {
    const data = {
      description: info.description,
      title: info.title,
      owner: user
    };

    filename ? data.filename = filename : null;

    const question = this.collection.push();
    question.set(data)

    return question.key;
  };

  async addAnswer(data, user) {
    const answers = await this.collection
      .child(data.id)
      .child('answers')
      .push();

    answers.set({ text: data.answer, user: user });

    return answers.key;
  };

  async setAnswerRight(questionId, answerId, user) {
    const query = await this.collection
      .child(questionId)
      .once('value');

    const question = query.val();
    const answers = question.answers;

    if (user.email !== question.owner.email) return false;

    for (let key in answers) {
      answers[key].correct = (key === answerId);
    };

    const update = await this.collection
      .child(questionId)
      .child('answers')
      .update(answers);

    return update;
  };
}

module.exports = Questions;
