const Exercise = require('../models/exercise');

const getLogsByUserId = (userId, limit) => {
  const logs = Exercise.find({
    userId,
  }).limit(Number(limit));
  return logs;
};

module.exports = { getLogsByUserId };
