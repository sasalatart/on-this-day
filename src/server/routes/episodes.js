const router = require('express').Router();
const checkValidRequest = require('../middlewares/valid-request');
const Day = require('../models/day');

router.get('/', checkValidRequest, async (req, res, next) => {
  const { type, short, ...query } = req.query;

  const day = await Day.findOne(query, Day.createSelector(type, short));

  if (day) {
    res.status(200).json(day);
  } else {
    next({ message: 'Day not found', statusCode: 404 });
  }
});

module.exports = router;
