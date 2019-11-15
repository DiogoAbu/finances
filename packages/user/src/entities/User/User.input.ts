import { InputType, Field } from 'type-graphql';

import User from './User';

@InputType()
export default class UserInput implements Partial<User> {
  @Field()
  name: string;

  @Field()
  email: string;
}
