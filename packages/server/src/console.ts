import repl from 'repl';
import connectDB from './db';
import models from './models';

connectDB().then((mongoose) => {
  const replServer = repl.start({
    prompt: `on-this-day> `,
  });

  replServer.context.mongoose = mongoose;
  Object.assign(replServer.context, models);
});
