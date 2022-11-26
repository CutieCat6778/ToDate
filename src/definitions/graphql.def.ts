
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Date {
    id: number;
    title: string;
    time: number;
    createdAt: number;
    inviters: string[];
    cancelled: boolean;
}

export class User {
    id: string;
    username: string;
    password: string;
    email: string;
    biography: string;
    avatar: string;
    createdAt: number;
    salt: string;
    refreshToken: string;
    dates: Date[];
}

export class SensoredUser {
    username: string;
    email: string;
    biography: string;
    avatar: string;
    dates: Date[];
}

export abstract class IQuery {
    abstract getUser(id: string): Nullable<SensoredUser> | Promise<Nullable<SensoredUser>>;
}

export abstract class IMutation {
    abstract updateUser(username: string, email: string, biography: string, avatar: string, password: string, salt: string, refreshToken: string): Nullable<User> | Promise<Nullable<User>>;

    abstract createUser(username: string, email: string, password: string, salt: string, refreshToken: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
