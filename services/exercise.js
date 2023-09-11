const ExerciseModel = require('../model/exercise');

const addExercise = (id, description, duration, date) => {
  let formatedDate = date;
  if (!formatedDate) {
    formatedDate = new Date();
  }
  const msg = new ExerciseModel({
    id,
    description,
    duration,
    date: formatedDate,
  });
  msg
    .save()
    .then((_) => {
      console.log('Data successfully added');
    })
    .catch((err) => {
      console.error(err);
    });
  return msg;
};

const getUsers = () => {
  const users = UserModel.find().exec();
  return users
};

module.exports = { addExercise };
