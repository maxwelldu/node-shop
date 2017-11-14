const mongoose = require('../utils/db');
let schema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  createdAt: Date,
  lastLoginAt: Date
});
module.exports = mongoose.model('User', schema);
