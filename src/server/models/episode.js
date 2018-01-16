const mongoose = require('mongoose');
const toJSON = require('./toJSON');

const keyWord = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
}, {
  toJSON: { transform: toJSON },
});

const episodeSchema = mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  isBCE: {
    type: Boolean,
    default: false,
  },
  data: {
    type: String,
    required: true,
  },
  kw: [keyWord],
}, {
  toJSON: { transform: toJSON },
});

module.exports = mongoose.model('Episode', episodeSchema);
module.exports.schema = episodeSchema;
