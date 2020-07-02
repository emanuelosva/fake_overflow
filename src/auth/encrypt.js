'use strict';

const bcrypt = require('bcrypt');

const hash = async (password) => {
  const rounds = 10;
  const hashedPassword = await bcrypt.hash(password, rounds);

  return hashedPassword;
};

const compare = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hash,
  compare,
};
