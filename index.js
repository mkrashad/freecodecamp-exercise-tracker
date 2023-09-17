const express = require('express');
const bodyParser = require('body-parser');
const userService = require('./service/user.js');
const exerciseService = require('./service/exercise.js');
const LogService = require('./service/log.js');
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
  const user = await userService.getUserById(id);
  if (user) {
    const exercise = {
      username: user.username,
      description,
      duration,
      date: date ? new Date(date) : new Date(),
      userId: user._id,
    };
    const result = await exerciseService.addExercise(exercise);
    const data = {
      username: result.username,
      description: result.description,
      duration: result.duration,
      date: new Date(result.date).toDateString(),
      _id: result.userId,
    };
    res.status(200).json(data);
  } else {
    res.status(400).json({ msg: 'Bad request' });
  }
});

app.get('/api/users/:_id/logs', async function (req, res) {
  const userId = req.params._id;
  const limit = req.query.limit;
  const exercises = await LogService.getLogsByUserId(userId, limit);

  const logsArray = exercises.map((e) => ({
    description: e.description,
    duration: e.duration,
    date: e.date.toDateString(),
  }));

  res.json({
    username: exercises[0]?.username,
    count: exercises.length,
    _id: exercises[0].id,
    log: logsArray,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + process.env.PORT);
  db.connectDB();
});
