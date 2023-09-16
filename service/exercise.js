const Exercise = require('../models/exercise');

const addExercise = (updatedData) => {
  const exercise = new Exercise(updatedData);
  exercise
    .save()
    .then((_) => {
      console.log('Data successfully added');
    })
    .catch((err) => {
      console.error(err);
    });
  return exercise;
};

const getExerciseByUserId = (userId) => {
  const user = Exercise.find({ userId }).exec();
  return user;
};

module.exports = { addExercise, getExerciseByUserId };
