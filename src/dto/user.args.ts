import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetUserIdArgs {
  @Field({ nullable: false })
  _id: string;
}

@ArgsType()
export class GetUserNameArgs {
  @Field({ nullable: false })
  username: string;
}

