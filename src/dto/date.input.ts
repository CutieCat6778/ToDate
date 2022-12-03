import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateDateInput {
  @Field((type) => String)
  title: string;

  @Field((type) => Int)
  time: number;

  @Field((type) => [String], { nullable: true })
  inviters?: string[];

  @Field((type) => Boolean, { nullable: true })
  cancelled?: boolean;

  @Field((type) => Int, { nullable: true })
  expireIn?: number;
}

@InputType()
export class UpdateDateInput {
  @Field(type => String)
  query: string;

  @Field((type) => String, { nullable: true })
  author: string;

  @Field((type) => String, { nullable: true })
  title: string;

  @Field((type) => Int, { nullable: true })
  time: number;

  @Field((type) => [String], { nullable: true })
  inviters?: string[];

  @Field((type) => Boolean, { nullable: true })
  cancelled: boolean;

  @Field((type) => Int, { nullable: true })
  expireIn: number;
}

@InputType()
export class RemoveDateInput {
  @Field(type => String)
  username: string;

  @Field(type => String)
  id: string;
}