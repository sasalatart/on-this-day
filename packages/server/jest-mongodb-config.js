/* eslint-disable no-undef */

module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest',
    },
    binary: {
      version: '4.2.2',
      skipMD5: true,
    },
    autoStart: false,
  },
};
