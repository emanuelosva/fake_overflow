'use strict';

const encrypt = require('../auth/encrypt');

class Users {
  constructor(db) {
    this.db = db;
    this.ref = this.db.ref('/');
    this.collection = this.ref.child('users');
  }

  // Add new user to db
  async create(data) {
    data.password = await encrypt.hash(data.password);
    const newUser = this.collection.push()
    newUser.set(data);

    return newUser.key
  };
}

module.exports = Users;
