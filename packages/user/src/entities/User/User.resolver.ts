import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import { User } from './User';
import { UserInput } from './User.input';

@Resolver((_of) => User)
export default class UserResolver {
  @Query((_returns) => User, { nullable: true })
  me() {
    return User.findOne('123');
  }

  @Query((_returns) => [User])
  allUsers() {
    return User.find();
  }

  @Mutation((_returns) => User)
  addUser(@Arg('data') userInput: UserInput) {
    return User.create(userInput).save();
  }
}
