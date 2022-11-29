import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateUserArgs {
  @Field((type) => String)
  @IsOptional()
  query?: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  username?: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  password?: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  email?: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  biography?: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  avatar?: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  salt?: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  refreshToken?: string;
}

@InputType()
export class CreateUserArgs {
  @Field((type) => String)
  username: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  email: string;
}