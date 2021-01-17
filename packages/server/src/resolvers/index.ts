/* eslint-disable global-require */
import fs from 'fs';
import path from 'path';
import { merge } from 'lodash';

const resolvers = fs
  .readdirSync(__dirname)
  .filter(
    (file) => file.endsWith('.resolvers.ts') || file.endsWith('.resolvers.js'),
  )
  .map((fileName) => require(path.join(__dirname, fileName)));

export default merge({}, ...resolvers);
