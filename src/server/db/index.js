const mongoose = require('mongoose');
const bluebird = require('bluebird');

const DB_URI = process.env.MONGODB_URI;
const DB_HOST = process.env.DB_HOST || 'mongo';
const DB_PORT = process.env.DB_PORT || '27017';
mongoose.connect(DB_URI || `mongodb://${DB_HOST}:${DB_PORT}/on-this-day`);
mongoose.Promise = bluebird;

module.exports = mongoose;
