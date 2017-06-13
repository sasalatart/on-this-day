const router = require('express').Router();
const checkValidRequest = require('../middlewares/episodes');
const Day = require('../models/day');
const { createSelector } = require('../utils/episodes');

router.get('/', checkValidRequest, (req, res, next) => {
  const { day: intDay, month: intMonth, type, short } = req.query;

  Day
    .findOne({ day: intDay, month: intMonth }, createSelector(type, short))
    .then((day) => {
      if (day) {
        res.status(200).json(day);
      } else {
        next({ message: 'Day not found', statusCode: 404 });
      }
    })
    .catch(next);
});

module.exports = router;
