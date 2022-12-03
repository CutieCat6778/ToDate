import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetDatesArgs {
  @Field((type) => String)
  username: string;

  @Field(type => String, { nullable: true })
  duration?: string;
}

@ArgsType()
export class GetDateArgs {
  @Field(type => String)
  username: string;

  @Field(type => String)
  id: string;
}