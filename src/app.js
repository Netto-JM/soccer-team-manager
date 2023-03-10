// src/app.js
const express = require('express');

const OK = 200;
// const INTERNAL_SERVER_ERROR = 500;
// const NOT_FOUND = 404;

const app = express();

app.get('/', (req, res) => res.status(OK).json({
  message: 'Hello World!'
}));

module.exports = app;