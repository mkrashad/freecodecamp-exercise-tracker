const User = require('../models/user');

const addUser = (username) => {
  const user = new User({
    username,
  });
  user
    .save()
    .then((_) => {
      console.log('Data successfully added');
    })
    .catch((err) => {
      console.error(err);
    });
  return user;
};

const getUsers = () => {
  const users = User.find().exec();
  return users;
};

const addExercise = (id, updatedData) => {
  const user = User.findByIdAndUpdate(
    id,
    { $push: { exercises: updatedData } },
    { new: true }
  );
  return user;
};

module.exports = { addUser, getUsers, addExercise };
