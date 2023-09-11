const UserModel = require('../model/user');

const addUser = (username) => {
  const msg = new UserModel({
    username,
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

module.exports = { addUser, getUsers };
