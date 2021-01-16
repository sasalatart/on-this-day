import mongoose from 'mongoose';
import _ from 'lodash';
import { MONGO_URL } from '../config';
import '../models';

mongoose.Promise = Promise;

export default function connectDB(): Promise<typeof mongoose> {
  return mongoose.connect(MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function chunkedOperations<K, D>(
  collection: K[],
  operation: (data: K[]) => Promise<D[]>,
  chunkSize = 8,
): Promise<D[]> {
  let result: D[] = [];
  const chunks = _.chunk(collection, chunkSize);
  for (let i = 0; i < chunks.length; i += 1) {
    result = result.concat(await operation(chunks[i]));
  }
  return result;
}
