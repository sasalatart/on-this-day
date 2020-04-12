import { GraphQLScalarType } from 'graphql';
import { Types } from 'mongoose';

export default new GraphQLScalarType({
  name: 'ObjectId',
  description: "The 'ObjectId' scalar type represents a mongodb unique ID",
  serialize: (val: Types.ObjectId): string => {
    return new Types.ObjectId(val).toHexString();
  },
});
