import path from 'path';
import { importSchema } from 'graphql-import';
export * from './types';

export default importSchema(path.join(__dirname, 'schema.graphql'));
