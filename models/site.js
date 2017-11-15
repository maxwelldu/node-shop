const mongoose = require('../utils/db');
let schema = new mongoose.Schema({
  name: { type: String, unique: true },
  desc: { type: String },
  url: { type: String }
});
module.exports = mongoose.model('Site', schema);
