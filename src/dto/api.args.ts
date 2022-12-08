import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LocationArgs {
  @Field((type) => String)
  lat: string;

  @Field((type) => String)
  long: string;
}
