import path from 'path';

export const OUTPUT_FILE_DIR = path.join(
  __dirname,
  '..',
  '..',
  'server',
  'src',
  'db',
  'seeds',
  'data.json',
);

export const REQUEST_DELAY = 125;

export const REQUEST_CONCURRENCY = 10;
