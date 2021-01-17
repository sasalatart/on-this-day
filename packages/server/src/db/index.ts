import mongoose from 'mongoose';
import { MONGO_URL } from '../config';
import '../models';

mongoose.Promise = Promise;

export function connectDB(): Promise<typeof mongoose> {
  return mongoose.connect(MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
