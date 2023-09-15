const Exercise = require('../models/exercise');

const addExercise = (updatedData) => {
  const exercise = new Exercise(updatedData)
    exercise.save()
    .then((_) => {
      console.log('Data successfully added');
    })
    .catch((err) => {
      console.error(err);
    });
  return exercise;
};

module.exports = { addExercise };
