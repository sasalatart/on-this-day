/* eslint-disable no-console */
const mongoose = require('../');
const data = require('./data.json');
const months = require('./months.json');
const Day = require('../../models/day');

console.log('Seeding data...');

function createDay(date) {
  const [monthName, day] = date.split('-');
  return Day.create({ ...data[date], day, month: months[monthName] });
}

async function seed() {
  try {
    await Day.remove({});
    await Promise.all(Object.keys(data).map(createDay));
    console.log('Finished seeding data.');
  } catch (error) {
    console.error(`Error: ${error}`);
  }

  console.log('Closing connection...');
  mongoose.connection.close();
  process.exit();
}

seed();
