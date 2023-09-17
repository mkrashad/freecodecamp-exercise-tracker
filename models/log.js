const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  description: { type: String },
  duration: { type: String },
  date: { type: Date },
});

module.exports = mongoose.model('Log', logSchema);
