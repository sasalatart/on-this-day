const _ = require('lodash');
const moment = require('moment');

const VALID_EPISODE_TYPES = ['all', 'events', 'births', 'deaths'];

function twoDigits(number) {
  return number < 10 ? `0${number}` : number;
}

function checkInvalidRequest(day, month, type) {
  if (!day || !month) {
    return { message: 'Both day and month must be present.', status: 406 };
  }

  const validDate = moment(`${twoDigits(day)}/${twoDigits(month)}/2016`, 'DD/MM/YYYY', true).isValid();
  if (!validDate) {
    return { message: 'Not a valid date.', status: 406 };
  }

  const validType = VALID_EPISODE_TYPES.includes(_.toLower(type));
  if (type && !validType) {
    return { message: 'Not a valid type of episode.', status: 406 };
  }

  return false;
}

module.exports = function checkValidRequestMiddleware(req, res, next) {
  const { day: intDay, month: intMonth, type } = req.query;

  const invalidRequest = checkInvalidRequest(intDay, intMonth, type);
  if (invalidRequest) {
    next(invalidRequest);
    return;
  }

  next();
};
