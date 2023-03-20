const express = require('express');
require('express-async-errors');
const {
  isValidTeam,
  existingId,
} = require('../middlewares');
const {
  teams
} = require('../teams');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;

let nextId = 3;

router.get('/', (_req, res) => res.status(HTTP_OK_STATUS).json({
  teams
}));

router.get('/:id', existingId, (req, res) => {
  const {
    id
  } = req.params;
  const team = teams.find((team) => team.id === Number(id));
  return res.status(HTTP_OK_STATUS).json({
    team
  });
});

router.post('/', isValidTeam, (req, res) => {
  if (
    !req.teams.teams.includes(req.body.sigla) &&
    teams.every((t) => t.sigla !== req.body.sigla)
  ) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json({
      message: 'There is already a team with this acronym'
    });
  }
  const team = {
    id: nextId,
    ...req.body
  };
  teams.push(team);
  nextId += 1;
  res.status(HTTP_CREATED_STATUS).json(team);
});

router.put('/:id', existingId, isValidTeam, (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  if (team) {
    const index = teams.indexOf(team);
    const updated = {
      id,
      ...req.body
    };
    teams.splice(index, 1, updated);
    res.status(HTTP_CREATED_STATUS).json(updated);
  } else {
    res.sendStatus(HTTP_BAD_REQUEST_STATUS);
  }
});

router.delete('/:id', existingId, (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  if (team) {
    const index = teams.indexOf(team);
    teams.splice(index, 1);
  }
  res.sendStatus(HTTP_NO_CONTENT_STATUS);
});

module.exports = router;