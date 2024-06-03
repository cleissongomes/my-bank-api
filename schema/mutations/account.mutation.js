import pkg from 'graphql';
const { GraphQLBoolean, GraphQLInt, GraphQLList } = pkg;
import Account from '../types/AccountInput.js';
import AccountInput from '../types/AccountInput.js';
import AccountService from '../../services/account.service.js';

const accountMutation = {
  createAccount: {
    type: Account,
    args: {
      account: {
        name: 'account',
        type: AccountInput,
      },
      resolve(_, args) {
        return AccountService.createAccount(args.account);
      },
    },
  },
  deleteAccount: {
    type: GraphQLBoolean,
    args: {
      id: {
        name: 'id',
        type: GraphQLInt,
      },
    },
    resolve(_, args) {
      AccountService.deleteAccount(args.id);
    },
  },
  updateAccount: {
    type: Account,
    args: {
      account: {
        name: 'account',
        type: AccountInput,
      },
    },
    resolve(_, args) {
      return AccountService.updateAccount(args.account);
    },
  },
};

export default accountMutation;
