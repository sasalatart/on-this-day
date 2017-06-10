const mongoose = require('mongoose');

const keyWord = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
});

const episodeSchema = mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  kw: [keyWord],
});

module.exports = mongoose.model('Episode', episodeSchema);
module.exports.schema = episodeSchema;
