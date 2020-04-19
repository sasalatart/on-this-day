module.exports = {
  extends: [
    'react-app',
    '@on-this-day/eslint-config',
    'prettier/react',
    'plugin:cypress/recommended',
  ],
  plugins: ['cypress'],
  env: {
    browser: true,
    'cypress/globals': true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.13.1',
    },
  },
};
