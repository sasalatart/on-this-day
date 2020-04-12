import app, { gqlServer } from './app';
import connectDB from './db';
import { port } from './config';

connectDB().then(() => {
  app.listen({ port }, () => {
    console.log(`🚀 Server ready at port ${port}`);
    console.log(`🚀 GraphQL endpoints at ${gqlServer.graphqlPath}`);
  });
});
