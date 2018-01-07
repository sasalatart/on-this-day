const app = require('./app');

const PORT = process.env.PORT || 9000;

/* eslint-disable no-console */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
