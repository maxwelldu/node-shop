const md5 = require('md5');
module.exports = {
  generatePassword(password) {
    return md5(md5(password) + md5(password.split('').reverse().join('')));
  }
}
