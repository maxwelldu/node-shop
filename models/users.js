const mongoose = require('../utils/db');
let schema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  avatar: { type: String, default: 'default.png' },
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site'
  }
});
module.exports = mongoose.model('User', schema);
