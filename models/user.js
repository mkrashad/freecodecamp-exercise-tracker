const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  exercises: [
    {
      description: { type: String },
      duration: { type: Number },
      date: { type: String },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
