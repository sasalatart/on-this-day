/* eslint-disable no-unused-vars */
module.exports = function errorHandlerMiddleware(err, req, res, next) {
  const message = err.message || 'Oops, something went wrong...';
  res.status(err.status || 500).json({ message });
};
