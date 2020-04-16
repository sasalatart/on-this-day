module.exports = {
  extends: [
    '@on-this-day/eslint-config',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  plugins: ['jest'],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    'jest/globals': true,
  },
};
