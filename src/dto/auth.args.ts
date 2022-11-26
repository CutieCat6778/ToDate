import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginArgs {
  @Field((type) => String)
  username: string;

  @Field((type) => String)
  password: string;
}
