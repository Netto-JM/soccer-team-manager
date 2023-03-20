const HTTP_BAD_REQUEST_STATUS = 400;

const isValidTeam = (req, res, next) => {
  const { nome, sigla } = req.body;
  if (!nome) return res.status(400).json({
    message: 'The "nome" field is required'
  });
  if (!sigla) return res.status(400).json({
    message: 'The "sigla" field is required'
  });
  next();
};

module.exports = { isValidTeam };