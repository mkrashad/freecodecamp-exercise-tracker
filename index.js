const express = require('express');
const bodyParser = require('body-parser');
const userService = require('./service/user.js');
const Db = require('./db/db');

const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/users', async function (req, res) {
  const { username } = req.body;
  const result = await userService.addUser(username);
  res.json(result);
});

app.get('/api/users', async function (req, res) {
  const users = await userService.getUsers();
  res.json(users);
});

app.post('/api/users/:_id/exercises', async function (req, res) {
  const { description, duration, date } = req.body;
  const id = req.params._id;
  let formatedDate = date;
  if (!date) {
    formatedDate = new Date().toDateString();
  }
  const exercises = await userService.addExercise(id, {
    description,
    duration,
    formatedDate: date,
  });
  res.status(200).json(exercises);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + process.env.PORT);
  Db.connectDB();
});
