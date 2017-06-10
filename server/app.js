require('./db');

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('short'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
