const express = require('express');
const bodyParser = require('body-parser');
const userService = require('./service/user.js');
const exerciseService = require('./service/exercise.js');
const db = require('./db/db');

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
  const formatedDate =
    new Date(date).toDateString() || new Date(new Date().now()).toDateString();
  const user = await userService.getUserById(id);
  if (user) {
    const exercise = {
      username: user.username,
      description,
      duration,
      date: formatedDate,
      userId: user._id,
    };
    const result = await exerciseService.addExercise(exercise);
    const data = {
      username: result.username,
      description: result.description,
      duration: result.duration,
      date: result.date,
      _id: result.userId,
    };
    console.log(data);
    res.status(200).json(data);
  } else {
    res.status(400).json({ msg: 'Bad request' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + process.env.PORT);
  db.connectDB();
});
