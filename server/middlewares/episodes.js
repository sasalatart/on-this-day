const { checkValidRequest } = require('../utils/episodes');

module.exports = function checkValidRequestMiddleware(req, res, next) {
  const { day: intDay, month: intMonth, type } = req.query;

  const invalidRequest = checkValidRequest(intDay, intMonth, type);
  if (invalidRequest) {
    next(invalidRequest);
    return;
  }

  next();
};
