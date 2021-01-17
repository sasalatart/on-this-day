import app, { gqlServer } from './app';
import { PORT } from './config';
import { connectDB } from './db';

connectDB().then(() => {
  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at port ${PORT}`);
    console.log(`🚀 GraphQL endpoints at ${gqlServer.graphqlPath}`);
  });
});
