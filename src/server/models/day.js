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

function createSelector(type, short) {
  if (type && type !== 'all') {
    const selector = ['events', 'births', 'deaths']
      .filter(text => text !== type)
      .reduce((acc, text) => `${acc} -${text}`, '');

    return short ? `${selector} -${type}.kw` : `${selector}`;
  }

  return short ? '-events.kw -births.kw -deaths.kw' : '';
}

module.exports = mongoose.model('Day', daySchema);
module.exports.createSelector = createSelector;
