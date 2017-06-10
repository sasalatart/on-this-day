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

  if (!type) {
    return { message: 'Type is required.', status: 406 };
  }

  const validType = _.includes(['events', 'births', 'deaths'], _.toLower(type));
  if (!validType) {
    return { message: 'Not a valid type of episode.', status: 406 };
  }

  return false;
}

function parseResponse(day, type) {
  return _.pick(day, ['_id', 'day', 'month', 'description', `${_.toLower(type)}`]);
}

module.exports = {
  checkValidRequest,
  parseResponse,
};
