/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: "date" })
export class Date {
  @Field((type) => Int)
  _id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => Int)
  time: number;

  @Field((type) => Int)
  createdAt: number;

  @Field((type) => [String], { nullable: true })
  inviters?: string[];

  @Field((type) => Boolean)
  cancelled: boolean;
}

@ObjectType({ description: "user" })
export class User {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  username: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String, { nullable: true })
  biography?: string;

  @Field((type) => String, { nullable: true })
  avatar?: string;

  @Field((type) => Int)
  createdAt: number;

  @Field((type) => String)
  salt: string;

  @Field((type) => String)
  refreshToken: string;

  @Field((type) => [Date])
  dates: Date[];
}

@ObjectType({ description: "sensoredUser" })
export class SensoredUser {
  @Field((type) => String)
  username: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String, { nullable: true })
  biography?: string;

  @Field((type) => String, { nullable: true })
  avatar?: string;

  @Field((type) => [Date], { nullable: true })
  dates?: Date[];
}
