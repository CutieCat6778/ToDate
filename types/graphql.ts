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
  biography?: Nullable<string>;
  avatar?: Nullable<string>;
}

export interface Date {
  _id: number;
  title: string;
  time: number;
  createdAt: number;
  inviters?: Nullable<string[]>;
  cancelled: boolean;
}

export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  biography?: Nullable<string>;
  avatar?: Nullable<string>;
  createdAt: number;
  salt: string;
  refreshToken: string;
  dates: Date[];
}

export interface SensoredUser {
  _id: string;
  username: string;
  email: string;
  biography?: Nullable<string>;
  avatar?: Nullable<string>;
  dates?: Nullable<Date[]>;
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

export interface LoginRes {
  login: UserRes;
}