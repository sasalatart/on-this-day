/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  client: {
    service: {
      name: 'on-this-day-client',
      localSchemaFile: path.join(
        __dirname,
        '..',
        'server',
        'src',
        'type-defs',
        'introspection.json',
      ),
    },
  },
};
