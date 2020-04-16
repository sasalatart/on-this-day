import mongoose from 'mongoose';
import connectDB from '../db';
import './matchers';

beforeAll(() => {
  return connectDB();
});

afterAll(() => {
  return mongoose.connection.close();
});
