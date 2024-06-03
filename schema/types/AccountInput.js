import pkg from 'graphql';
const { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = pkg;

const AccountInput = new GraphQLInputObjectType({
  name: 'AccountInput',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  }),
});

export default AccountInput;
