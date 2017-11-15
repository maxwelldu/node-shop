const mongoose = require('../utils/db');
let schema = new mongoose.Schema({
  title: { type: String, unique: true },
  desc: { type: String }
});
module.exports = mongoose.model('Cat', schema);
