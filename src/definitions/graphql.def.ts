
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

export class UpdateDateInput {
    query: string;
    author?: Nullable<string>;
    title?: Nullable<string>;
    time?: Nullable<number>;
    inviters?: Nullable<string[]>;
    cancelled?: Nullable<boolean>;
    expireIn?: Nullable<number>;
}

export class RemoveDateInput {
    username: string;
    id: string;
}

export class CreateDateInput {
    title: string;
    time: number;
    inviters?: Nullable<string[]>;
    cancelled?: Nullable<boolean>;
    expireIn?: Nullable<number>;
    location: string;
}

export class Date {
    _id: number;
    author: string;
    title: string;
    location: string;
    time: number;
    createdAt: number;
    inviters?: Nullable<string[]>;
    cancelled: boolean;
    expireIn: number;
}

export class Dates {
    dates: Date[];
    next?: Nullable<Date[]>;
}

export class User {
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

export class SensoredUser {
    _id: string;
    displayName: string;
    username: string;
    email: string;
    biography?: Nullable<string>;
    avatar?: Nullable<string>;
    dates: string[];
}

export class Tokens {
    accessToken: string;
    refreshToken: string;
}

export class UserRes {
    user: User;
    tokens: Tokens;
}

export class Interception {
    baseStreet: string;
    secondaryStreet1: string;
    intersectionType: string;
    displayName: string;
}

export class Address {
    addressLine: string;
    adminDistrict: string;
    adminDistrict2: string;
    countryRegion: string;
    formattedAddress: string;
    intersection: Interception;
    locality: string;
    postalCode: string;
    countryRegionIso2: string;
}

export class GeocodePoint {
    type: string;
    coordinates: number[];
    calculationMethod: string;
    usageTypes: string[];
}

export class Point {
    type: string;
    coordinates: number[];
}

export class Location {
    bbox: number[];
    name: string;
    point: Point;
    address: Address;
    confidence: string;
    entityType: string;
    geocodePoint: GeocodePoint;
    matchCodes: string[];
}

export abstract class IQuery {
    abstract sayHello(): string | Promise<string>;

    abstract getUserById(_id: string): SensoredUser | Promise<SensoredUser>;

    abstract getUserByName(username: string): SensoredUser | Promise<SensoredUser>;

    abstract me(): User | Promise<User>;

    abstract login(username: string, password: string): UserRes | Promise<UserRes>;

    abstract logout(): boolean | Promise<boolean>;

    abstract refreshToken(): Tokens | Promise<Tokens>;

    abstract getDates(username: string, duration?: Nullable<string>): Dates | Promise<Dates>;

    abstract getDateById(username: string, id: string): Date | Promise<Date>;

    abstract getLocationData(lat: string, long: string): Location | Promise<Location>;
}

export abstract class IMutation {
    abstract updateUser(updateUser: UpdateUserArgs): User | Promise<User>;

    abstract signup(createUser: CreateUserArgs): UserRes | Promise<UserRes>;

    abstract updateDate(updateDate: UpdateDateInput): Date | Promise<Date>;

    abstract removeDate(removeDate: RemoveDateInput): boolean | Promise<boolean>;

    abstract createDate(createDate: CreateDateInput): Date | Promise<Date>;
}

type Nullable<T> = T | null;
