const express = require('express');
const { isValidTeam, existingId, apiCredentials } = require('./middlewares');
const { teams } = require('./teams');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_BAD_REQUEST_STATUS = 400;
// const HTTP_NOT_FOUND_STATUS = 404;

const app = express();

app.use(express.json());
app.use(apiCredentials);

let nextId = 3;

app.get('/teams', (_req, res) => res.status(HTTP_OK_STATUS).json({
  teams
}));

app.get('/teams/:id', existingId, (req, res) => {
  const { id } = req.params;
  const team = teams.find((team) => team.id === Number(id));
  return res.status(HTTP_OK_STATUS).json({ team });
});

app.post('/teams', isValidTeam, (req, res) => {
  const team = { id: nextId, ...req.body };
  teams.push(team);
  nextId += 1;
  res.status(HTTP_CREATED_STATUS).json(team);
});

app.put('/teams/:id', existingId, isValidTeam, (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  if (team) {
    const index = teams.indexOf(team);
    const updated = { id, ...req.body };
    teams.splice(index, 1, updated);
    res.status(HTTP_CREATED_STATUS).json(updated);
  } else {
    res.sendStatus(HTTP_BAD_REQUEST_STATUS);
  }
});

app.delete('/teams/:id', existingId, (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  if (team) {
    const index = teams.indexOf(team);
    teams.splice(index, 1);
  }
  res.sendStatus(HTTP_NO_CONTENT_STATUS);
});

module.exports = app;