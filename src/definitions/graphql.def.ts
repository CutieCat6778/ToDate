
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UpdateUserArgs {
    query: string;
    username?: Nullable<string>;
    password?: Nullable<string>;
    email?: Nullable<string>;
    biography?: Nullable<string>;
    avatar?: Nullable<string>;
    salt?: Nullable<string>;
    refreshToken?: Nullable<string>;
}

export class CreateUserArgs {
    username: string;
    password: string;
    email: string;
}

export class Date {
    _id: number;
    title: string;
    time: number;
    createdAt: number;
    inviters?: Nullable<string[]>;
    cancelled: boolean;
}

export class User {
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

export class SensoredUser {
    _id: string;
    username: string;
    email: string;
    biography?: Nullable<string>;
    avatar?: Nullable<string>;
    dates?: Nullable<Date[]>;
}

export class Tokens {
    accessToken: string;
    refreshToken: string;
}

export class UserRes {
    user: User;
    tokens: Tokens;
}

export abstract class IQuery {
    abstract sayHello(): string | Promise<string>;

    abstract getUserById(_id: string): SensoredUser | Promise<SensoredUser>;

    abstract getUserByName(username: string): SensoredUser | Promise<SensoredUser>;

    abstract me(): User | Promise<User>;

    abstract login(username: string, password: string): UserRes | Promise<UserRes>;

    abstract logout(): boolean | Promise<boolean>;

    abstract refreshToken(): UserRes | Promise<UserRes>;
}

export abstract class IMutation {
    abstract updateUser(updateUser: UpdateUserArgs): User | Promise<User>;

    abstract signup(createUser: CreateUserArgs): UserRes | Promise<UserRes>;
}

type Nullable<T> = T | null;
