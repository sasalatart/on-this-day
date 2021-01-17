import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { connectDB } from '../../db';
import models from '../../models';
import { SeedData } from './types';
import { createYearDates } from './year-dates';

// TODO(sasalatart): validate that data actually has the SeedData interface
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'),
) as SeedData;

async function handleExit(code = 0): Promise<never> {
  await mongoose.connection.close();
  process.exit(code);
}

async function seed(): Promise<void> {
  const { YearDate: yearDateModel, Episode: episodeModel } = models;

  if (process.argv[2] !== '--force') {
    console.log('⏳ Checking if database is already populated...');
    const yearDates = await yearDateModel.countDocuments();
    if (yearDates > 0) {
      console.log('✅ Database is already populated. Not running seeds.');
      await handleExit(0);
    }
    console.log('⏳ Database is empty. Continuing with seeds...');
  }

  console.log('⏳ Seeding data...');
  try {
    await Promise.all([
      yearDateModel.deleteMany({}),
      episodeModel.deleteMany({}),
    ]);
    await createYearDates(data, yearDateModel, episodeModel);
    console.log('✅ Database is now populated.');
  } catch (error) {
    console.error(`🛑 Error: ${error.stack}`);
    await handleExit(1);
  }

  await handleExit(0);
}

connectDB().then(seed);
