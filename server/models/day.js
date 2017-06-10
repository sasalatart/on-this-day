const mongoose = require('mongoose');
const episodeSchema = require('./episode').schema;

const daySchema = mongoose.Schema({
  day: {
    type: Number,
    required: true,
    min: 1,
    max: 31,
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  description: {
    type: String,
    required: true,
  },
  events: [episodeSchema],
  births: [episodeSchema],
  deaths: [episodeSchema],
});

module.exports = mongoose.model('Day', daySchema);
