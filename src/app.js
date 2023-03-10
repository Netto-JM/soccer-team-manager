const express = require('express');

const OK = 200;
// const INTERNAL_SERVER_ERROR = 500;
// const NOT_FOUND = 404;

const app = express();

app.use(express.json());

const teams = [{
    id: 1,
    name: 'São Paulo Futebol Clube',
    initials: 'SPF',
  },
  {
    id: 2,
    name: 'Clube Atlético Mineiro',
    initials: 'CAM',
  },
];

app.get('/', (req, res) => res.status(OK).json({
  message: 'Hello World!'
}));

app.get('/teams', (req, res) => res.status(200).json({
  teams
}));

app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);

  res.status(201).json({ team: newTeam });
});

module.exports = app;