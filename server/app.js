require('./db');
const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error-handler');

const app = express();

app.use(morgan('short'));

app.use('/episodes', require('./routes/episodes'));

app.use(errorHandler);

module.exports = app;
