const mongoose = require('mongoose');

const Exercise = new mongoose.Schema({
  id: Object,
  description: String,
  duration: Number,
  date: Date
});

module.exports = mongoose.model('Exercise', Exercise);
