const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  description: { type: String },
  duration: { type: String },
  date: { type: String },
});

module.exports = mongoose.model('Log', logSchema);
