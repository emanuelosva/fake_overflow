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

  // Validate user on login
  async validateUser(data) {
    const userQuery = await this.collection
      .orderByChild('email')
      .equalTo(data.email)
      .once('value')

    const userFound = userQuery.val();
    if (userFound) {
      const userId = Object.keys(userFound)[0];
      const correctPassword = await encrypt
        .compare(data.password, userFound[userId].password);

      const result = correctPassword ? userFound[userId] : false;

      return result
    }

    return false;
  };
}

module.exports = Users;
