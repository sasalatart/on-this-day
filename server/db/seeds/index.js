/* eslint-disable no-console */
const mongoose = require('../');
const data = require('./data.json');
const months = require('./months.json');
const Day = require('../../models/day');

console.log('Seeding data...');

function createDay(date) {
  const [monthName, day] = date.split('-');
  return Day.create(Object.assign({}, { day, month: months[monthName] }, data[date]));
}

function mapJson() {
  return Object
    .keys(data)
    .map(createDay);
}

Day.remove({})
  .then(() => Promise.all(mapJson()))
  .then(() => {
    console.log('Finished seeding data.');
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  })
  .finally(() => {
    console.log('Closing connection...');
    mongoose.connection.close();
    process.exit();
  });
