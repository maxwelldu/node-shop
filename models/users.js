const mongoose = require('../utils/db');
let schema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  createdAt: Date,
  lastLoginAt: Date,
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site'
  }
});
module.exports = mongoose.model('User', schema);
