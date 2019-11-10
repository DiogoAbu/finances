import { InputType, Field } from 'type-graphql';

import { User } from './User';

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  name: string;

  @Field()
  email: string;
}
