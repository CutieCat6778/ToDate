
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface UpdateUserArgs {
  query: string;
  username?: Nullable<string>;
  password?: Nullable<string>;
  email?: Nullable<string>;
  biography?: Nullable<string>;
  avatar?: Nullable<string>;
  salt?: Nullable<string>;
  refreshToken?: Nullable<string>;
}

export interface CreateUserArgs {
  username: string;
  password: string;
  email: string;
}

export interface UpdateDateInput {
  query: string;
  author?: Nullable<string>;
  title?: Nullable<string>;
  time?: Nullable<number>;
  inviters?: Nullable<string[]>;
  cancelled?: Nullable<boolean>;
  expireIn?: Nullable<number>;
}

export interface RemoveDateInput {
  username: string;
  id: string;
}

export interface CreateDateInput {
  title: string;
  time: number;
  inviters?: Nullable<string[]>;
  cancelled?: Nullable<boolean>;
  expireIn?: Nullable<number>;
}

export interface Date {
  _id: number;
  author: string;
  title: string;
  time: number;
  createdAt: number;
  inviters?: Nullable<string[]>;
  cancelled: boolean;
  expireIn: number;
}

export interface User {
  _id: string;
  displayName: string;
  username: string;
  password: string;
  email: string;
  biography?: Nullable<string>;
  avatar?: Nullable<string>;
  createdAt: number;
  salt: string;
  refreshToken: string;
  dates: string[];
}

export interface SensoredUser {
  _id: string;
  displayName: string;
  username: string;
  email: string;
  biography?: Nullable<string>;
  avatar?: Nullable<string>;
  dates: string[];
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserRes {
  user: User;
  tokens: Tokens;
}

type Nullable<T> = T | null;
