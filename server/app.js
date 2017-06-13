require('./db');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('./middlewares/error-handler');

const app = express();

app.use(morgan('short'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('/api/episodes', require('./routes/episodes'));

app.get('^((?!/api).)*$', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use(errorHandler);

module.exports = app;
