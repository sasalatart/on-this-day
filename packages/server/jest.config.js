/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  preset: '@shelf/jest-mongodb',
  transform: tsjPreset.transform,
  setupFilesAfterEnv: ['./src/tests/jest-setup.ts'],
};
