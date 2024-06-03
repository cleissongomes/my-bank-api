import pkg from 'graphql';
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = pkg;

const Account = new GraphQLObjectType({
  name: 'Account',
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

export default Account;
