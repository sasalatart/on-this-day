import { Types } from 'mongoose';
import { GraphQLField } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

type Root = Record<string, Types.ObjectId>;

export default class IDFrom extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<never, never>): void {
    field.resolve = (root: Root): Types.ObjectId => root[this.args.from];
  }
}
