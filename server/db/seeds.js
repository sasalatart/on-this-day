const mongoose = require('.');
const data = require('./seeds.json');
const months = require('./months.json');
const Day = require('../models/day');

/* eslint-disable no-console */
console.log('Seeding data...');

function createDay(date) {
  const [monthName, day] = date.split('-');
  const month = months[monthName];

  const { description, events, births, deaths } = data[date];

  const dayEntry = new Day({ day, month, description, events, births, deaths });
  return dayEntry.save();
}

function mapJson() {
  return Object
    .keys(data)
    .map(createDay);
}

Day
  .remove({})
  .then(() => Promise.all(mapJson()))
  .then(() => { console.log('Finished seeding data.'); })
  .catch((err) => { console.error(err); })
  .finally(() => {
    console.log('Closing connection...');
    mongoose.connection.close();
    process.exit();
  });
