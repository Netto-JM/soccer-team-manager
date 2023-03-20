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