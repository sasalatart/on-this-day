import path from 'path';

const {
  MONGO_URL, // from @shelf/jest-mongodb
  MONGODB_HOST = 'localhost',
  MONGODB_PORT = 27017,
  MONGODB_URI,
  NODE_ENV = 'development',
  PORT = 9000,
} = process.env;

export const dbURI =
  (NODE_ENV === 'test'
    ? MONGO_URL // from @shelf/jest-mongodb
    : MONGODB_URI) || `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/on-this-day`;

export const port = PORT;

export const clientDir = path.resolve(__dirname, '..', '..', 'client', 'build');
