import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import { clientDir } from './config';
import schemaDirectives from './directives';
import i18n from './i18n';
import models from './models';
import resolvers from './resolvers';
import scalars from './scalars';
import typeDefs from './type-defs';
import { Context } from './types';

export const gqlServer = new ApolloServer({
  typeDefs,
  resolvers: _.merge(resolvers, scalars),
  schemaDirectives,
  context(): Context {
    return { models, t: i18n.t.bind(i18n) };
  },
  playground: true,
  introspection: true,
});

const app = express();

app.use(cors());
app.use(express.static(clientDir));

gqlServer.applyMiddleware({ app });

app.get('*', (req, res) => {
  res.sendFile(path.resolve(clientDir, 'index.html'));
});

export default app;
