import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import { CLIENT_DIR } from './config';
import schemaDirectives from './directives';
import i18n from './i18n';
import models from './models';
import resolvers from './resolvers';
import scalars from './scalars';
import typeDefs from './type-defs';

export const baseServerConfig = {
  typeDefs,
  resolvers: _.merge(resolvers, scalars),
  schemaDirectives,
  context: { models, t: i18n.t.bind(i18n) },
};

export const gqlServer = new ApolloServer({
  ...baseServerConfig,
  playground: true,
  introspection: true,
});

const app = express();

app.use(cors());
app.use(express.static(CLIENT_DIR));

gqlServer.applyMiddleware({ app });

app.get('*', (_req, res) => {
  res.sendFile(path.resolve(CLIENT_DIR, 'index.html'));
});

export default app;
