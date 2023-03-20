const express = require('express');
require('express-async-errors');
const { apiCredentials } = require('./middlewares');
const teamsRouter = require('./routes/teamsRouter');

const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;

const app = express();

app.use(express.json());
app.use(apiCredentials);

app.use('/teams', teamsRouter);

app.use((err, _req, _res, next) => {
  console.error(err.stack);
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS).json({
    message: `Something went wrong! Message: ${err.message}`
  });
});

module.exports = app;