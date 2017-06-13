const _ = require('lodash');
const moment = require('moment');

function twoDigits(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
}

function checkValidRequest(day, month, type) {
  if (!day || !month) {
    return { message: 'Both day and month must be present.', status: 406 };
  }

  const validDate = moment(`${twoDigits(day)}/${twoDigits(month)}/2016`, 'DD/MM/YYYY', true).isValid();
  if (!validDate) {
    return { message: 'Not a valid date.', status: 406 };
  }

  const validType = _.includes(['events', 'births', 'deaths'], _.toLower(type));
  if (type && !validType) {
    return { message: 'Not a valid type of episode.', status: 406 };
  }

  return false;
}

function createSelector(type, short) {
  if (type) {
    const selector = ['events', 'births', 'deaths']
      .filter(text => text !== type)
      .reduce((acc, text) => `${acc} -${text}`, '');

    return short ? `${selector} -${type}.kw` : `${selector}`;
  }

  return short ? '-events.kw -births.kw -deaths.kw' : '';
}

module.exports = {
  checkValidRequest,
  createSelector,
};
