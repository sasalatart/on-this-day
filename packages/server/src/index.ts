import app, { gqlServer } from './app';
import connectDB from './db';
import { PORT } from './config';

connectDB().then(() => {
  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at port ${PORT}`);
    console.log(`🚀 GraphQL endpoints at ${gqlServer.graphqlPath}`);
  });
});
