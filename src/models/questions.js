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

  async create(data, user) {
    data.owner = user;
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

    return answers;
  };
}

module.exports = Questions;
