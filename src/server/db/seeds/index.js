/* eslint-disable no-console */
const ProgressBar = require('progress');
const mongoose = require('../');
const data = require('./data.json');
const months = require('./months.json');
const Day = require('../../models/day');

console.log('Seeding data...');

const PROGRESS_OPTIONS = { total: 365, width: 50, incomplete: '.', head: '>' };

function createDay(date) {
  const [monthName, day] = date.split('-');
  return Day.create({ ...data[date], day, month: months[monthName] });
}

function createYear() {
  const progressBar = new ProgressBar('[:bar] :percent', PROGRESS_OPTIONS);
  return Object.keys(data).reduce(
    (acc, date) => acc.then(() => createDay(date).then(() => progressBar.tick())),
    Promise.resolve(),
  );
}

async function seed() {
  try {
    await Day.remove({});
    await createYear();
  } catch (error) {
    console.error(`Error: ${error}`);
  }

  mongoose.connection.close();
  process.exit();
}

seed();
