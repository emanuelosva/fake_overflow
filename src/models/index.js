'use strict';

// Firebase connection
const admin = require('firebase-admin');
const serviceAccount = require('../../config/firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://platzioverflow-a9254.firebaseio.com',
});

const db = admin.database();
// Firebase connection


// ORM emulation
const Users = require('./users');
const Questions = require('./questions');

module.exports = {
  usersModel: new Users(db),
  questionsModel: new Questions(db),
};
