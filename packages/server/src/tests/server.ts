import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerTestClient,
  createTestClient,
} from 'apollo-server-testing';
import { baseServerConfig } from '../app';
import { Context } from '../types';

export default function createTestServer(
  ctx?: Partial<Context>,
): ApolloServerTestClient {
  const server = new ApolloServer({
    ...baseServerConfig,
    context: { ...baseServerConfig.context, ...ctx },
    mockEntireSchema: false,
    mocks: true,
  });
  return createTestClient(server);
}
