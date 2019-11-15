import { resolveUserReference, User, UserResolver } from './User';

export const entities = [User];

export const resolvers = [UserResolver];

export const resolveReferences = {
  User: { __resolveReference: resolveUserReference },
};
