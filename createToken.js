const crypto = require('crypto');

function createToken() {
  const token = crypto.randomBytes(16).toString('hex');

  return token;
}

module.exports = createToken;
