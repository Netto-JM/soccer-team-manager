const { teams } = require("../teams");

const HTTP_NOT_FOUND_STATUS = 404;

const existingId = (req, res, next) => {
  const id = Number(req.params.id);
  if (teams.some((t) => t.id === id)) {
    return next();
  }
  res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Team not found' });
};

module.exports = { existingId };


// usa o middleware
app.get("/teams/:id", existingId, (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  res.json(team);
});