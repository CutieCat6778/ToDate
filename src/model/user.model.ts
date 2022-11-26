import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Date {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  title: string;

  @Field(type => Int)
  time: number;

  @Field(type => Int)
  createdAt: number;

  @Field(type => [String])
  inviters: string[];

  @Field(type => Boolean)
  cancelled: boolean;
}