const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  userId: { type: String},
  username: { type: String },
  description: { type: String },
  duration: { type: Number },
  date: { type: Date },
});

module.exports = mongoose.model('Exercise', exerciseSchema);
