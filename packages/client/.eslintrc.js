module.exports = {
  extends: ['react-app', '@on-this-day/eslint-config', 'prettier/react'],
  env: {
    browser: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.13.1',
    },
  },
};
