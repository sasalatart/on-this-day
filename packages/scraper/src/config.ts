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

export const DELAY_BETWEEN_REQUESTS = 250;
