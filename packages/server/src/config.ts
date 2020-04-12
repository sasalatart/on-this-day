import path from 'path';

const {
  MONGODB_HOST = 'localhost',
  MONGODB_PORT = 27017,
  MONGODB_URI,
  PORT = 9000,
} = process.env;

export const dbURI =
  MONGODB_URI || `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/on-this-day`;

export const port = PORT;

export const clientDir = path.resolve(__dirname, '..', '..', 'client', 'build');
