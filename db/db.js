require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect(`${process.env.MONGO_URI}`)
    .then(() => {
      console.log('Database connection successfully');
    })
    .catch((err) => {
      console.error('Database connection error');
    });
};

module.exports = { connectDB };
