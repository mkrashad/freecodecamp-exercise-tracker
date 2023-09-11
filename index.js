const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cors = require('cors');
const userService = require('./services/user.js');
const exerciseService = require('./services/exercise.js');
const user = require('./model/user.js');
require('dotenv').config();
require('./db/db');

app.use(cors());
app.use(express.static('public'));

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

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

app.post('/api/users/:id/exercises', async function (req, res) {
  const { description, duration, date } = req.body;
  const exerciseId = req.body[':_id'];
  const users = await userService.getUsers();
  users.forEach(async (user) => {
    if (user.id === exerciseId) {
      await exerciseService.addExercise(
        exerciseId,
        description,
        duration,
        date
      );
      res.json({
        username: user.username,
        description: description,
        duration: duration,
        date: date,
        _id: exerciseId,
      });
    }
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
