import path from 'path';

export const {
  MONGO_URL = 'mongodb://mongo:27017/on-this-day', // also provided by from @shelf/jest-mongodb
  PORT = 9000,
} = process.env;

export const CLIENT_DIR = path.resolve(
  __dirname,
  '..',
  '..',
  'client',
  'build',
);
