const router = require('express').Router();
const checkValidRequest = require('../middlewares/valid-request');
const Day = require('../models/day');
const { createSelector } = require('../models/day');

router.get('/', checkValidRequest, async (req, res, next) => {
  const {
    day: intDay,
    month: intMonth,
    type,
    short,
  } = req.query;

  try {
    const day = await Day.findOne({ day: intDay, month: intMonth }, createSelector(type, short));
    if (day) {
      res.status(200).json(day);
    } else {
      next({ message: 'Day not found', statusCode: 404 });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
