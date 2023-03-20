const HTTP_BAD_REQUEST_STATUS = 400;

const isValidTeam = (req, res, next) => {
  const requiredProperties = ['nome', 'sigla'];
  if (requiredProperties.every((property) => property in req.body)) {
    next();
  } else {
    res.sendStatus(HTTP_BAD_REQUEST_STATUS);
  }
};

module.exports = { isValidTeam };